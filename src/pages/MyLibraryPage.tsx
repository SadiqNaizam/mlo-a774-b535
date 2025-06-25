import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookCover3D from '@/components/BookCover3D';

// shadcn/ui Components
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Placeholder data for the user's purchased books
const myBooks = [
  {
    id: 'lib-1',
    title: 'Dune',
    coverImageUrl: 'https://images.unsplash.com/photo-1608178388422-54f7a7a5a41d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'lib-2',
    title: 'The Hobbit',
    coverImageUrl: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'lib-3',
    title: 'Foundation',
    coverImageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'lib-4',
    title: 'Brave New World',
    coverImageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'lib-5',
    title: 'A Wrinkle in Time',
    coverImageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'lib-6',
    title: 'The Lord of the Rings',
    coverImageUrl: 'https://images.unsplash.com/photo-1620353128916-45371c69f52f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'lib-7',
    title: 'To Kill a Mockingbird',
    coverImageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
  },
];


const MyLibraryPage = () => {
  console.log('MyLibraryPage loaded');

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-stone-900">
      <Header />
      <main className="flex-1 container py-8 md:py-12">
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-stone-800 dark:text-stone-200 font-serif">
              My Library
            </h1>
            <p className="text-stone-600 dark:text-stone-400 mt-2">All your purchased books, ready to read.</p>
        </div>
        
        <Card className="border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-950/50">
            <CardContent className="p-6 md:p-8">
                {myBooks.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 justify-items-center">
                        {myBooks.map(book => (
                            <BookCover3D
                                key={book.id}
                                title={book.title}
                                coverImageUrl={book.coverImageUrl}
                                type="library" // This is crucial for showing the "Read Online" button
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-300 dark:border-stone-700 p-12 text-center">
                        <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200">Your bookshelf is waiting for a story.</h3>
                        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                            You haven't purchased any books yet.
                        </p>
                        <Button asChild className="mt-4">
                            <Link to="/">Browse the Store</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default MyLibraryPage;