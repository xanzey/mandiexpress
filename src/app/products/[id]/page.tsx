
"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { mockProducts } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/cart-provider';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, ChevronLeft, ShoppingBag, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const { addToCart, setSheetOpen } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Button asChild variant="link" className="mt-4">
          <Link href="/">Go back to shopping</Link>
        </Button>
      </div>
    );
  }
  
  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => {
        const newQuantity = prev + amount;
        return newQuantity >= 0.5 ? newQuantity : 0.5;
    });
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: `${quantity} kg of ${product.name} added to cart!`,
      description: "You can view your cart by clicking the shopping cart icon.",
    });
  };
  
  const handleBuyNow = () => {
    addToCart(product, quantity);
    setSheetOpen(true);
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button asChild variant="ghost">
            <Link href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Daily Rates
            </Link>
        </Button>
      </div>
      <div className="max-w-4xl mx-auto">
        <Card>
            <CardContent className="p-4 md:p-6 grid md:grid-cols-2 gap-8">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        data-ai-hint={product.dataAiHint}
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <Badge 
                        className="w-fit mb-2"
                        variant={product.availability === 'In Stock' ? 'default' : 'destructive'}
                    >
                        {product.availability}
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
                    <p className="text-primary font-bold text-3xl mt-4">
                        ₹{(product.price * quantity).toFixed(2)}
                        <span className="text-lg font-normal text-muted-foreground"> / {quantity} kg</span>
                    </p>
                    <p className="text-muted-foreground mt-4">
                        A brief description of the product will go here. For now, enjoy our fresh and high-quality {product.name.toLowerCase()}.
                    </p>

                    <div className="mt-6">
                        <Label htmlFor="quantity" className="text-sm font-medium">Quantity (kg)</Label>
                        <div className="flex items-center gap-2 mt-2">
                            <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => handleQuantityChange(-0.5)}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <Input 
                                id="quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(parseFloat(e.target.value) || 0.5)}
                                className="w-20 text-center"
                                step="0.5"
                                min="0.5"
                            />
                            <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => handleQuantityChange(0.5)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <Button 
                            size="lg"
                            onClick={handleAddToCart} 
                            disabled={product.availability === 'Out of Stock'}
                        >
                            <PlusCircle className="mr-2 h-5 w-5" /> Add to Cart
                        </Button>
                         <Button 
                            size="lg"
                            variant="outline"
                            onClick={handleBuyNow} 
                            disabled={product.availability === 'Out of Stock'}
                        >
                            <ShoppingBag className="mr-2 h-5 w-5" /> Buy Now
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
