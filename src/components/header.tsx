
"use client";

import Link from "next/link";
import { Leaf, ShoppingCart, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Cart } from "@/components/cart";
import { useCart } from "@/context/cart-provider";
import { useAuth } from "@/context/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Header() {
  const { cartCount, isSheetOpen, setSheetOpen } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              MandiExpress
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Daily Rates
            </Link>
            {user && <Link
              href="/orders"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              My Orders
            </Link>}
             {user && <Link
              href="/wallet"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Wallet
            </Link>}
          </nav>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="flex items-center"
            >
              <Leaf className="mr-2 h-6 w-6 text-primary" />
              <span className="font-bold font-headline">MandiExpress</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <Link href="/" className="text-muted-foreground">Daily Rates</Link>
                {user && <Link href="/orders" className="text-muted-foreground">My Orders</Link>}
                {user && <Link href="/wallet" className="text-muted-foreground">Wallet & Referrals</Link>}
                {user && <Link href="/profile" className="text-muted-foreground">Profile</Link>}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs">
                    {cartItems.length > 0 ? cartItems.reduce((acc, item) => acc + item.quantity, 0).toFixed(1) : 0}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <Cart />
            </SheetContent>
          </Sheet>

          {user ? (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://placehold.co/32x32.png" alt="User" data-ai-hint="person portrait" />
                            <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">My Account</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email || user.phoneNumber}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                       <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                       <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                       <Link href="/wallet">Wallet</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}

        </div>
      </div>
    </header>
  );
}
