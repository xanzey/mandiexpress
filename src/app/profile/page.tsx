
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { withProtected, useAuth } from "@/context/auth-provider";
import { Mail, Phone, Home, Pencil, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

function ProfilePage() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const isPhoneAuth = !!user?.phoneNumber;

  const [shippingAddress, setShippingAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  
  const handleAddressSave = () => {
    setIsEditingAddress(false);
    toast({
        title: "Address Saved!",
        description: "Your shipping address has been updated.",
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 font-headline">My Profile</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://placehold.co/128x128.png" alt="User" data-ai-hint="person portrait" />
              <AvatarFallback>
                {isPhoneAuth ? <Phone /> : <Mail />}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user?.displayName || "User"}</CardTitle>
              <p className="text-muted-foreground">{user?.email || user?.phoneNumber}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <h4 className="font-semibold flex items-center gap-2"><Home className="h-4 w-4" /> Shipping Address</h4>
                {!isEditingAddress && (
                    <Button variant="ghost" size="icon" onClick={() => setIsEditingAddress(true)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
              </div>
              {isEditingAddress ? (
                <div className="mt-2 space-y-2">
                    <Input 
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Enter your full address"
                    />
                    <Button onClick={handleAddressSave}>Save Address</Button>
                </div>
              ) : (
                <p className="text-muted-foreground mt-1 pl-6">
                  {shippingAddress || "Please add your shipping address."}
                </p>
              )}
            </div>
            {user?.phoneNumber && (
                <div>
                    <h4 className="font-semibold">Phone Number</h4>
                    <p className="text-muted-foreground">{user.phoneNumber}</p>
                </div>
            )}
            {user?.email && (
                 <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            )}
             <div>
              <h4 className="font-semibold">Member Since</h4>
              <p className="text-muted-foreground">{user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric'}) : 'N/A'}</p>
            </div>
          </div>
           <Separator className="my-4" />
           <Button variant="destructive" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default withProtected(ProfilePage);
