
"use client";

import { useCart } from "@/context/cart-provider";
import { Button } from "./ui/button";
import { ChevronRight, ShoppingCart } from "lucide-react";
import Image from "next/image";

export function FloatingCartButton() {
  const { cartItems, cartCount, setSheetOpen } = useCart();

  if (cartItems.length === 0) {
    return null;
  }
  
  const firstItemImage = cartItems[0]?.product.image;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 w-[90%]">
        <Button 
            className="w-full h-14 rounded-xl bg-accent text-accent-foreground text-lg font-bold flex justify-between items-center shadow-lg hover:bg-accent/90"
            onClick={() => setSheetOpen(true)}
        >
            <div className="flex items-center gap-2">
                {firstItemImage && (
                    <div className="relative h-10 w-10 bg-white p-1 rounded-full">
                        <Image src={firstItemImage} alt="Cart item" fill className="object-contain" />
                    </div>
                )}
                <span>{cartCount.toFixed(1)} {cartCount > 1 ? 'ITEMS' : 'ITEM'}</span>
            </div>
            <div className="flex items-center">
                <span>View cart</span>
                <ChevronRight className="h-6 w-6" />
            </div>
        </Button>
    </div>
  );
}
