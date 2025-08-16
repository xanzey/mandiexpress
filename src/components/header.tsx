
"use client";

import Link from "next/link";
import { ChevronDown, User, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Cart } from "@/components/cart";
import { useCart } from "@/context/cart-provider";
import { useAuth } from "@/context/auth-provider";

export function Header() {
  const { isSheetOpen, setSheetOpen } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex flex-col">
            <span className="text-sm font-bold uppercase">MandiExpress in</span>
            <div className="flex items-center">
                <span className="text-lg font-bold">8 minutes</span>
            </div>
            <div className="flex items-center text-xs">
                <span>HOME - JJ Colony, Near WTT</span>
                <ChevronDown className="h-4 w-4" />
            </div>
        </div>
        
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
