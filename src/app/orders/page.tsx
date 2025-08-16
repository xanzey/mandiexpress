import { OrderStatus } from '@/components/order-status';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockOrders } from '@/lib/mock-data';

export default function OrdersPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2 font-headline">My Orders</h1>
      <p className="text-muted-foreground mb-8">Track the status of your recent orders.</p>
      <div className="space-y-6">
        {mockOrders.map((order) => (
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
    </div>
  );
}
