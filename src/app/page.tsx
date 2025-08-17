
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockCategories } from '@/lib/mock-data';
import { Search, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { CategoryCard } from '@/components/category-card';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);

  // For typing animation
  const [placeholder, setPlaceholder] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const suggestions = ['"fresh vegetables"', '"juicy fruits"', '"dairy products"', '"exotic spices"'];

  useEffect(() => {
    const handleTyping = () => {
      const currentSuggestion = suggestions[placeholderIndex];
      
      if (isDeleting) {
        setPlaceholder(currentSuggestion.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setPlaceholder(currentSuggestion.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === currentSuggestion.length) {
        // Pause at end of word
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPlaceholderIndex((prev) => (prev + 1) % suggestions.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? 100 : 150);
    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, placeholder, placeholderIndex, suggestions]);


  useEffect(() => {
    // Check for SpeechRecognition API
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
        
        recognition.continuous = false;
        recognition.lang = 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            toast({
                variant: 'destructive',
                title: 'Voice search error',
                description: `There was a problem with the speech recognition service: ${event.error}. Please check your network connection and try again.`,
            });
            setIsListening(false);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setSearchQuery(transcript);
        };
    }
  }, [toast]);

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      toast({
        variant: 'destructive',
        title: 'Voice search not supported',
        description: 'Your browser does not support the Web Speech API.',
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

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
            placeholder={`Search ${placeholder}|`}
            className="pl-10 pr-10 h-12 rounded-xl shadow-sm" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="button" onClick={handleMicClick} className="absolute right-3 top-1/2 -translate-y-1/2">
            <Mic className={cn("h-5 w-5 text-muted-foreground transition-colors", isListening && "text-destructive")} />
          </button>
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

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}
