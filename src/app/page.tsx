import { ProductCard } from '@/components/product-card';
import { mockProducts } from '@/lib/mock-data';

export default function Home() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2 font-headline">Daily Rate Card</h1>
      <p className="text-muted-foreground mb-8">Freshly updated prices for today's produce.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
