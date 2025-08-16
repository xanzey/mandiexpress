
import { ProductCard } from '@/components/product-card';
import { mockProducts } from '@/lib/mock-data';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductsPage({ searchParams }: { searchParams: { category?: string, q?: string }}) {
  const { category, q } = searchParams;
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = category ? product.name.toLowerCase().includes(category.replace('-', ' & ')) : true; // This is mock logic
    const matchesSearch = q ? product.name.toLowerCase().includes(q.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  const pageTitle = q 
    ? `Search results for "${q}"` 
    : category?.replace('-', ' & ') || 'All Products';

  return (
    <div className="container py-4">
      <div className="flex items-center mb-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <ChevronLeft />
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline capitalize">{pageTitle}</h1>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold">No products found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your search or category.</p>
          <Button asChild className="mt-6">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
