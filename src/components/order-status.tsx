import { cn } from "@/lib/utils";
import type { Order } from "@/types";
import { PackageCheck, Package, ChefHat, Truck } from "lucide-react";

interface OrderStatusProps {
  status: Order['status'];
}

const statusConfig = {
    'Pending': { icon: Package, text: 'Order Pending' },
    'Preparing': { icon: ChefHat, text: 'Preparing Items' },
    'Out for Delivery': { icon: Truck, text: 'Out for Delivery' },
    'Delivered': { icon: PackageCheck, text: 'Delivered' },
}

const allStatuses: Order['status'][] = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];

export function OrderStatus({ status }: OrderStatusProps) {
    const currentIndex = allStatuses.indexOf(status);

    return (
        <div>
            <h4 className="font-semibold mb-4">Order Status</h4>
            <div className="flex items-center justify-between relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" />
                <div 
                    className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all" 
                    style={{width: `${(currentIndex / (allStatuses.length - 1)) * 100}%`}} 
                />
                {allStatuses.map((s, index) => {
                    const isActive = index <= currentIndex;
                    const config = statusConfig[s];
                    return (
                        <div key={s} className="z-10 flex flex-col items-center w-24">
                            <div className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 transition-colors",
                                isActive ? "border-primary" : "border-border",
                            )}>
                                <config.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                            </div>
                            <p className={cn("text-xs text-center mt-2", isActive ? "font-semibold" : "text-muted-foreground")}>
                                {config.text}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
