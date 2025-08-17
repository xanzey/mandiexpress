
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function PhoneLoginForm() {
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
      const formattedPhone = `+91${phone}`;
      const result = await sendOtp(formattedPhone);
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
        description: "Please check the phone number and try again.",
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
        title: "Logged in successfully!",
      });
      router.push("/profile");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "The OTP you entered is incorrect. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!otpSent) {
    return (
      <form onSubmit={handleSendOtp} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="9876543210"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </form>
    );
  }

  return (
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
        {loading ? "Verifying..." : "Verify OTP & Login"}
      </Button>
    </form>
  );
}

function EmailLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      toast({
        title: "Logged in successfully!",
      });
      router.push("/profile");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleEmailLogin} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Choose your login method below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="phone" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="phone">Phone</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>
            <TabsContent value="phone">
              <div className="pt-4">
                <PhoneLoginForm />
              </div>
            </TabsContent>
            <TabsContent value="email">
              <div className="pt-4">
                <EmailLoginForm />
              </div>
            </TabsContent>
          </Tabs>
          <div id="recaptcha-container"></div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
