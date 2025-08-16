
"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCart } from "@/context/cart-provider";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: `${product.name} added to cart!`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden h-full group">
        <Link href={`/products/${product.id}`} className="flex flex-col h-full">
            <CardHeader className="p-2">
                <div className="relative aspect-square">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        data-ai-hint={product.dataAiHint}
                    />
                </div>
            </CardHeader>
          <CardContent className="p-2 flex-1">
            <p className="text-muted-foreground text-xs">1 kg</p>
            <CardTitle className="text-sm font-semibold">{product.name}</CardTitle>
          </CardContent>
          <CardFooter className="p-2 pt-0 flex justify-between items-center">
             <div className="flex flex-col">
                 <p className="text-sm text-muted-foreground line-through">₹{(product.price * 1.1).toFixed(2)}</p>
                 <p className="font-bold">₹{product.price.toFixed(2)}</p>
             </div>
            <Button 
                size="icon"
                className="w-10 h-10 bg-accent/20 text-accent hover:bg-accent/30"
                onClick={handleAddToCart} 
                disabled={product.availability === 'Out of Stock'}
            >
                <Plus className="h-5 w-5" />
            </Button>
          </CardFooter>
        </Link>
    </Card>
  );
}
