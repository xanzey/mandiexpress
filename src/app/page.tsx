
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockCategories } from '@/lib/mock-data';
import { Search, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { CategoryCard } from '@/components/category-card';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { name: 'All', icon: 'https://placehold.co/48x48.png', dataAiHint: 'store', href: '/products' },
    { name: 'Vegetables', icon: 'https://placehold.co/48x48.png', dataAiHint: 'vegetables', href: '/products?category=vegetables' },
    { name: 'Fruits', icon: 'https://placehold.co/48x48.png', dataAiHint: 'fruits', href: '/products?category=fruits' },
    { name: 'Dairy', icon: 'https://placehold.co/48x48.png', dataAiHint: 'dairy products', href: '/products?category=dairy' },
    { name: 'Masala', icon: 'https://placehold.co/48x48.png', dataAiHint: 'spices', href: '/products?category=masala' },
  ];

  return (
    <div className="bg-primary/5">
      <div className="container pt-4 pb-8">
        <form onSubmit={handleSearch} className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder='Search "gardening essentials"' 
            className="pl-10 pr-10 h-12 rounded-xl shadow-sm" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Mic className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </form>
        <div className="flex justify-around mb-6">
            {categories.map(cat => (
                <Link href={cat.href} key={cat.name} className="flex flex-col items-center gap-2">
                    <div className={`p-1 rounded-full shadow-sm transition-transform hover:scale-105 ${cat.name === 'All' ? 'bg-primary' : ''}`}>
                         <Image src={cat.icon} alt={cat.name} width={48} height={48} className="rounded-full bg-background" data-ai-hint={cat.dataAiHint} />
                    </div>
                    <span className={`text-xs font-medium ${cat.name === 'All' ? 'text-primary' : 'text-muted-foreground'}`}>{cat.name}</span>
                </Link>
            ))}
        </div>
      </div>
      <div className="bg-background rounded-t-3xl pt-8 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
        <div className="container">
            <div className="relative text-center mb-8 bg-amber-400/20 py-4 px-2 rounded-xl overflow-hidden shadow-sm">
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
