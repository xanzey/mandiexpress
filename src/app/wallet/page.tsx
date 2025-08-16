
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { withProtected } from "@/context/auth-provider";
import { Copy, Gift, Wallet as WalletIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function WalletPage() {
    const { toast } = useToast();
    const referralCode = "MANDI123";

    const handleCopyReferral = () => {
        navigator.clipboard.writeText(referralCode);
        toast({
            title: "Referral code copied!",
            description: "Share it with your friends to earn rewards.",
        });
    };

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-2 font-headline">Wallet & Referrals</h1>
            <p className="text-muted-foreground mb-8">
                View your wallet balance and refer friends to earn rewards.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <WalletIcon className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle>My Wallet</CardTitle>
                                <CardDescription>Your available balance</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">₹50.00</p>
                        <p className="text-sm text-muted-foreground mt-2">
                            Use this balance for your future orders.
                        </p>
                        <Button className="mt-4">Add Money</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Gift className="h-8 w-8 text-accent" />
                            <div>
                                <CardTitle>Refer & Earn</CardTitle>
                                <CardDescription>Invite friends and get rewards</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Share your referral code with friends. When they sign up and place their first order, you both get ₹50 in your wallet!
                        </p>
                        <div className="flex items-center space-x-2 mt-4">
                            <p className="text-lg font-mono p-2 bg-muted rounded-md flex-1 text-center">
                                {referralCode}
                            </p>
                            <Button variant="outline" size="icon" onClick={handleCopyReferral}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default withProtected(WalletPage);
