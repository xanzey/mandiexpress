
"use client";

import Link from "next/link";
import { User, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Cart } from "@/components/cart";
import { useCart } from "@/context/cart-provider";
import { useAuth } from "@/context/auth-provider";

export function Header() {
  const { isSheetOpen, setSheetOpen } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-green-500 to-green-600 text-primary-foreground shadow-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-3xl font-logo tracking-wider">
            MandiExpress
        </Link>
        
        <div className="flex items-center gap-4">
            <Link href="/wallet">
              <Button variant="ghost" size="icon">
                  <Wallet className="h-6 w-6" />
              </Button>
            </Link>

            {user ? (
              <Link href="/profile">
                  <Button variant="ghost" size="icon">
                      <User className="h-6 w-6" />
                  </Button>
              </Link>
            ) : (
                <Button asChild variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    <Link href="/login">Login</Link>
                </Button>
            )}
        </div>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
            <Cart />
        </SheetContent>
      </Sheet>
    </header>
  );
}
