
import { ProductCard } from '@/components/product-card';
import { mockProducts } from '@/lib/mock-data';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// This is a new page. In a real app, you'd fetch products by category
export default function ProductsPage({ searchParams }: { searchParams: { category?: string }}) {
  const categoryName = searchParams.category?.replace('-', ' & ') || 'All Products';
  
  // Filter products based on category if provided, otherwise show all
  // This is mock logic, in a real app you'd fetch from a DB
  const products = mockProducts;

  return (
    <div className="container py-4">
      <div className="flex items-center mb-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <ChevronLeft />
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline capitalize">{categoryName}</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

