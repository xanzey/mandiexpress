
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function SignupPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const { sendOtp, verifyOtp } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await sendOtp(phone);
      setConfirmationResult(result);
      setOtpSent(true);
      toast({
        title: "OTP Sent!",
        description: "Please check your phone for the verification code.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to send OTP",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyOtp(confirmationResult, otp);
      toast({
        title: "Account created successfully!",
        description: "You are now logged in.",
      });
      router.push("/profile");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your phone number to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!otpSent ? (
             <form onSubmit={handleSendOtp} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
            </form>
          ) : (
             <form onSubmit={handleVerifyOtp} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input 
                        id="otp" 
                        type="text"
                        placeholder="123456"
                        required 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Verifying..." : "Verify OTP & Create Account"}
                </Button>
            </form>
          )}
           <div id="recaptcha-container"></div>
            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                    Login
                </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
