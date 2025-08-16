
"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Link from "next/link";

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');

  const handleConfirmOrder = () => {
    clearCart();
    setStep('cart');
    toast({
        title: "Order Placed!",
        description: "Your fresh veggies are on their way.",
    });
  }

  if (cartItems.length === 0) {
    return (
      <>
        <SheetHeader>
          <SheetTitle>Your Cart is Empty</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center justify-center h-full">
            <p className="text-muted-foreground mb-4">Add some fresh items to get started!</p>
            <SheetClose asChild>
                <Button asChild>
                    <Link href="/">Continue Shopping</Link>
                </Button>
            </SheetClose>
        </div>
      </>
    );
  }

  return (
    <div className="flex h-full flex-col">
        <SheetHeader>
            <SheetTitle>{step === 'cart' ? 'My Cart' : 'Checkout'}</SheetTitle>
        </SheetHeader>
        {step === 'cart' ? (
            <>
                <ScrollArea className="flex-1 pr-4">
                    <div className="flex flex-col gap-4 py-4">
                        {cartItems.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-4">
                                <Image
                                    src={item.product.image}
                                    alt={item.product.name}
                                    width={64}
                                    height={64}
                                    className="rounded-md"
                                    data-ai-hint={item.product.dataAiHint}
                                />
                                <div className="flex-1">
                                    <h4 className="font-semibold">{item.product.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        ₹{item.product.price.toFixed(2)} / kg
                                    </p>
                                    <p className="font-semibold">Total: ₹{(item.product.price * item.quantity).toFixed(2)}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity - 0.5)}>
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span>{item.quantity} kg</span>
                                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity + 0.5)}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <SheetFooter className="mt-auto">
                    <div className="w-full space-y-4">
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setStep('checkout')}>
                            Proceed to Checkout
                        </Button>
                    </div>
                </SheetFooter>
            </>
        ) : (
            <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-6 py-4">
                    <div>
                        <h3 className="font-semibold mb-2">Delivery Slot</h3>
                        <RadioGroup defaultValue="morning">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="morning" id="morning" />
                                <Label htmlFor="morning">Morning (7-9 AM)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="evening" id="evening" />
                                <Label htmlFor="evening">Evening (5-8 PM)</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Payment Method</h3>
                        <RadioGroup defaultValue="upi">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="upi" id="upi" />
                                <Label htmlFor="upi">UPI</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cod" id="cod" />
                                <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <SheetFooter>
                    <div className="w-full space-y-4">
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="w-full" onClick={() => setStep('cart')}>
                                Back to Cart
                            </Button>
                            <SheetClose asChild>
                                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleConfirmOrder}>
                                    Confirm Order
                                </Button>
                            </SheetClose>
                        </div>
                    </div>
                </SheetFooter>
            </div>
        )}
    </div>
  );
}
