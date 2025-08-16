
import { mockCategories } from '@/lib/mock-data';
import { Search, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CategoryCard } from '@/components/category-card';

export default function Home() {
  const categories = [
    { name: 'All', icon: 'https://placehold.co/48x48.png' },
    { name: 'Vegetables', icon: 'https://placehold.co/48x48.png' },
    { name: 'Fruits', icon: 'https://placehold.co/48x48.png' },
    { name: 'Dairy', icon: 'https://placehold.co/48x48.png' },
    { name: 'Masala', icon: 'https://placehold.co/48x48.png' },
  ];

  return (
    <div className="bg-primary/10">
      <div className="container pt-4 pb-8">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder='Search "gardening essentials"' className="pl-10 pr-10 h-12 rounded-xl" />
          <Mic className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex justify-around mb-6">
            {categories.map(cat => (
                <div key={cat.name} className="flex flex-col items-center gap-2">
                    <div className={`p-1 rounded-full ${cat.name === 'All' ? 'bg-primary' : ''}`}>
                         <Image src={cat.icon} alt={cat.name} width={48} height={48} className="rounded-full bg-background" data-ai-hint="vegetables" />
                    </div>
                    <span className={`text-xs font-medium ${cat.name === 'All' ? 'text-primary' : ''}`}>{cat.name}</span>
                </div>
            ))}
        </div>
      </div>
      <div className="bg-background rounded-t-3xl pt-8">
        <div className="container">
            <div className="relative text-center mb-8 bg-amber-400/20 py-4 px-2 rounded-xl overflow-hidden">
                <Image src="https://placehold.co/150x80.png" alt="Welcome banner left" width={100} height={80} className="absolute left-0 bottom-0" data-ai-hint="shopping bag"/>
                <Image src="https://placehold.co/150x80.png" alt="Welcome banner right" width={100} height={80} className="absolute right-0 bottom-0" data-ai-hint="shopping bag"/>
                <h2 className="text-xl font-bold">WELCOME</h2>
                <p>Order now & enjoy FREE delivery</p>
            </div>
          <h2 className="text-2xl font-bold mb-4 font-headline">Bestsellers</h2>
          <div className="grid grid-cols-2 gap-4">
            {mockCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
