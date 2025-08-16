
"use client";

import { OrderStatus } from '@/components/order-status';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { withProtected } from '@/context/auth-provider';
import type { Order } from '@/types';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function OrdersPage() {
  const orders: Order[] = []; // This will be populated from your database in the future

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2 font-headline">My Orders</h1>
      <p className="text-muted-foreground mb-8">Track the status of your recent and past orders.</p>
      
      {orders.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">You have no orders yet</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven&apos;t made your first order.</p>
          <Button asChild className="mt-6">
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Order #{order.id}</CardTitle>
                        <CardDescription>Placed on {order.date}</CardDescription>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{order.deliverySlot}</p>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                  <Separator className="my-4" />
                  <div>
                      <h4 className="font-semibold mb-2">Items</h4>
                      <ul className="list-disc list-inside text-muted-foreground">
                          {order.items.map(item => (
                              <li key={item.product.id}>{item.product.name} (x{item.quantity})</li>
                          ))}
                      </ul>
                  </div>
                  <Separator className="my-4" />
                  <OrderStatus status={order.status} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default withProtected(OrdersPage);
