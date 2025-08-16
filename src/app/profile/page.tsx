
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { withProtected, useAuth } from "@/context/auth-provider";
import { Phone } from "lucide-react";

function ProfilePage() {
  const { user } = useAuth();
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 font-headline">My Profile</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://placehold.co/128x128.png" alt="User" data-ai-hint="person portrait" />
              <AvatarFallback>
                <Phone />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">User</CardTitle>
              <p className="text-muted-foreground">{user?.phoneNumber}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Shipping Address</h4>
              <p className="text-muted-foreground">
                123 Green Valley, Fresh Fields, Veggieland, 456789
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Phone Number</h4>
              <p className="text-muted-foreground">{user?.phoneNumber}</p>
            </div>
             <div>
              <h4 className="font-semibold">Member Since</h4>
              <p className="text-muted-foreground">July 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default withProtected(ProfilePage);
