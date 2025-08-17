
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { withProtected, useAuth } from "@/context/auth-provider";
import { Mail, Phone, Home, Pencil, LogOut, MapPin, User as UserIcon } from "lucide-react";
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
    name: string;
    phone: string;
    houseNo: string;
    street: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
}

function EditProfileDialog() {
    const { user, updateProfile } = useAuth();
    const [name, setName] = useState(user?.displayName || "");
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const handleSave = async () => {
        if (!name.trim()) {
            toast({
                variant: "destructive",
                title: "Name cannot be empty.",
            });
            return;
        }
        try {
            await updateProfile({ displayName: name });
            toast({
                title: "Profile updated!",
                description: "Your name has been successfully changed.",
            });
            setIsOpen(false);
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: error.message,
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile Name</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
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
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
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
              <AvatarImage src={user?.photoURL || "https://placehold.co/128x128.png"} alt="User" data-ai-hint="person portrait" />
              <AvatarFallback>
                {isPhoneAuth ? <Phone /> : <Mail />}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{user?.displayName || "User"}</CardTitle>
                <EditProfileDialog />
              </div>
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
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
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
                             <div className="col-span-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" defaultValue={address?.name || user?.displayName || ''} required />
                            </div>
                             <div className="col-span-2">
                                <Label htmlFor="phone">Mobile Number</Label>
                                <Input id="phone" name="phone" defaultValue={address?.phone || user?.phoneNumber || ''} required />
                            </div>
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
                {address ? (
                    <div className="text-muted-foreground mt-1 pl-6">
                        <p className="font-semibold text-foreground">{address.name}</p>
                        <p>{address.phone}</p>
                        <p>{formatAddress(address)}</p>
                    </div>
                ) : (
                    <p className="text-muted-foreground mt-1 pl-6">Please add your shipping address.</p>
                )}
            </div>
            {user?.displayName && (
                <div>
                    <h4 className="font-semibold flex items-center gap-2"><UserIcon className="h-4 w-4" /> Name</h4>
                    <p className="text-muted-foreground pl-6">{user.displayName}</p>
                </div>
            )}
            {user?.phoneNumber && (
                <div>
                    <h4 className="font-semibold flex items-center gap-2"><Phone className="h-4 w-4" /> Phone Number</h4>
                    <p className="text-muted-foreground pl-6">{user.phoneNumber}</p>
                </div>
            )}
            {user?.email && (
                 <div>
                    <h4 className="font-semibold flex items-center gap-2"><Mail className="h-4 w-4" /> Email</h4>
                    <p className="text-muted-foreground pl-6">{user.email}</p>
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
