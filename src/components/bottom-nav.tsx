
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Wallet, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 shadow-[0_-2px_10px_-3px_rgba(0,0,0,0.05)]">
      <div className="container flex justify-around h-16 items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.label} className={cn(
              "flex flex-col items-center gap-1 text-muted-foreground transition-colors",
              isActive ? "text-accent" : "hover:text-foreground"
            )}>
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
