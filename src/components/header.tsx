
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
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md">
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
            <div className="font-logo text-3xl text-white drop-shadow-sm">
                MandiExpress
            </div>
        </Link>
        
        <div className="flex items-center gap-4">
            <Link href="/wallet">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                  <Wallet className="h-6 w-6" />
              </Button>
            </Link>

            {user ? (
              <Link href="/profile">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                      <User className="h-6 w-6" />
                  </Button>
              </Link>
            ) : (
                <Button asChild className="bg-white text-amber-600 hover:bg-white/90">
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
