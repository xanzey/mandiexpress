"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-provider";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: `${product.name} added to cart!`,
      description: "You can view your cart by clicking the shopping cart icon.",
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
        <CardHeader className="p-0">
            <div className="relative aspect-video">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={product.dataAiHint}
                />
                <Badge 
                    className="absolute top-2 right-2"
                    variant={product.availability === 'In Stock' ? 'default' : 'destructive'}
                >
                    {product.availability}
                </Badge>
            </div>
        </CardHeader>
      <CardContent className="p-4 flex-1">
        <CardTitle className="text-lg font-headline">{product.name}</CardTitle>
        <CardDescription className="text-primary font-bold text-xl mt-2">
            ₹{product.price.toFixed(2)}
            <span className="text-sm font-normal text-muted-foreground"> / kg</span>
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
            className="w-full" 
            onClick={handleAddToCart} 
            disabled={product.availability === 'Out of Stock'}
        >
            <PlusCircle className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
