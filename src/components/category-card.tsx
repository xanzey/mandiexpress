
import type { Category } from '@/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.id}`}>
      <Card className="overflow-hidden">
        <CardContent className="p-4 text-center">
          <div className="grid grid-cols-2 gap-2 mb-2">
            {category.productImages.slice(0, 4).map((img, index) => (
              <div key={index} className="relative aspect-square">
                <Image 
                    src={img.url} 
                    alt={`${category.name} product ${index + 1}`} 
                    fill 
                    className="object-cover rounded-md"
                    data-ai-hint={img.dataAiHint} 
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">+{category.moreCount} more</p>
          <h3 className="font-semibold mt-1">{category.name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
