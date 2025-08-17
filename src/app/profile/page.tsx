
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { withProtected, useAuth } from "@/context/auth-provider";
import { Mail, Phone, Home, Pencil, LogOut, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Address {
    houseNo: string;
    street: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
}

function ProfilePage() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const isPhoneAuth = !!user?.phoneNumber;

  const [address, setAddress] = useState<Address | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Load address from localStorage when the component mounts
  useEffect(() => {
    try {
      const savedAddress = localStorage.getItem('userAddress');
      if (savedAddress) {
        setAddress(JSON.parse(savedAddress));
      }
    } catch (error) {
        console.error("Failed to parse address from localStorage", error)
    }
  }, []);

  const handleAddressSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAddress: Address = {
        houseNo: formData.get('houseNo') as string,
        street: formData.get('street') as string,
        landmark: formData.get('landmark') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        pincode: formData.get('pincode') as string,
    };
    
    // In a real app, you would save this to a database.
    // For now, we use localStorage to persist it on the client's browser.
    localStorage.setItem('userAddress', JSON.stringify(newAddress));
    setAddress(newAddress);
    setIsEditDialogOpen(false);
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
    } catch (error: any)      {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error.message,
      });
    }
  };
  
  const formatAddress = (addr: Address) => {
    return `${addr.houseNo}, ${addr.street}, ${addr.landmark}, ${addr.city}, ${addr.state} - ${addr.pincode}`;
  }

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
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                         <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Shipping Address</DialogTitle>
                        </DialogHeader>
                        <div className="text-center text-muted-foreground my-2">
                            <p>For map integration, an API key is required.</p>
                            <p className="text-xs">This is a planned future enhancement.</p>
                        </div>
                        <div className="flex justify-center my-4">
                            <Button variant="outline">
                                <MapPin className="mr-2 h-4 w-4" />
                                Select on Map (Coming Soon)
                            </Button>
                        </div>
                        <form onSubmit={handleAddressSave} className="grid grid-cols-2 gap-4">
                             <div className="col-span-2 sm:col-span-1">
                                <Label htmlFor="houseNo">House No. / Flat</Label>
                                <Input id="houseNo" name="houseNo" defaultValue={address?.houseNo} required />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <Label htmlFor="street">Street / Area</Label>
                                <Input id="street" name="street" defaultValue={address?.street} required />
                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="landmark">Landmark</Label>
                                <Input id="landmark" name="landmark" defaultValue={address?.landmark} />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" name="city" defaultValue={address?.city} required />
                            </div>
                             <div className="col-span-2 sm:col-span-1">
                                <Label htmlFor="state">State</Label>
                                <Input id="state" name="state" defaultValue={address?.state} required />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <Label htmlFor="pincode">Pincode</Label>
                                <Input id="pincode" name="pincode" defaultValue={address?.pincode} required />
                            </div>
                            <DialogFooter className="col-span-2 mt-4">
                               <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save Address</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
              </div>
                <p className="text-muted-foreground mt-1 pl-6">
                  {address ? formatAddress(address) : "Please add your shipping address."}
                </p>
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

    