
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { withProtected } from "@/context/auth-provider";
import { Wallet as WalletIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function WalletPage() {
    const { toast } = useToast();

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-2 font-headline">My Wallet</h1>
            <p className="text-muted-foreground mb-8">
                View your wallet balance and manage your funds.
            </p>
            <div className="max-w-md mx-auto">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <WalletIcon className="h-8 w-8 text-accent" />
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
            </div>
        </div>
    );
}

export default withProtected(WalletPage);
