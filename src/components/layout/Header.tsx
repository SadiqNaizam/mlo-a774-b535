import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, ShoppingCart, User } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-stone-900 ${
      isActive ? 'text-stone-900 font-semibold' : 'text-stone-600'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-stone-100/95 backdrop-blur supports-[backdrop-filter]:bg-stone-100/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-stone-700" />
            <span className="hidden font-bold sm:inline-block text-lg text-stone-800">
              The Reading Room
            </span>
          </Link>
        </div>
        
        <div className="flex-1 flex justify-center px-4 lg:px-8">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search books, authors, or genres..." className="pl-10"/>
            </div>
        </div>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <NavLink to="/" className={navLinkClasses}>
            Browse
          </NavLink>
          <NavLink to="/my-library" className={navLinkClasses}>
            My Library
          </NavLink>
        </nav>
        
        <div className="flex items-center gap-2 ml-4">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User Profile</span>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/checkout">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;