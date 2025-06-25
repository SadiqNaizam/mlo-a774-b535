import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookshelfCarousel from '@/components/BookshelfCarousel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Define the shape of a book object for type safety
interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
}

// Sample data for the carousels
const newArrivals: Book[] = [
  { id: 'na1', title: 'Klara and the Sun', author: 'Kazuo Ishiguro', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1603206535l/54120408.jpg' },
  { id: 'na2', title: 'Project Hail Mary', author: 'Andy Weir', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1597695795l/54493401.jpg' },
  { id: 'na3', title: 'The Four Winds', author: 'Kristin Hannah', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1610594344l/53138081.jpg' },
  { id: 'na4', title: 'The Push', author: 'Ashley Audrain', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598634849l/52476839.jpg' },
  { id: 'na5', title: 'Crying in H Mart', author: 'Michelle Zauner', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1601937996l/54814676.jpg' },
];

const bestsellers: Book[] = [
  { id: 'bs1', title: 'The Silent Patient', author: 'Alex Michaelides', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1582216131l/40097951.jpg' },
  { id: 'bs2', title: 'Where the Crawdads Sing', author: 'Delia Owens', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1582135295l/36809135.jpg' },
  { id: 'bs3', title: 'Atomic Habits', author: 'James Clear', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378.jpg' },
  { id: 'bs4', title: 'The Vanishing Half', author: 'Brit Bennett', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1578334149l/51791252.jpg' },
  { id: 'bs5', title: 'Educated', author: 'Tara Westover', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1506026634l/35133922.jpg' },
];

const curatedCollection: Book[] = [
  { id: 'cc1', title: 'Circe', author: 'Madeline Miller', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1565909496l/35959740.jpg' },
  { id: 'cc2', title: 'The Song of Achilles', author: 'Madeline Miller', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1331028516l/11250317.jpg' },
  { id: 'cc3', title: 'Normal People', author: 'Sally Rooney', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1572663953l/41057294.jpg' },
  { id: 'cc4', title: 'The House in the Cerulean Sea', author: 'T.J. Klune', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1569499801l/45047384.jpg' },
  { id: 'cc5', title: 'Piranesi', author: 'Susanna Clarke', coverImageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1585163102l/50202953.jpg' },
];

const Homepage = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-900">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="text-center py-16 md:py-24 px-4 bg-gradient-to-b from-stone-100 to-stone-50 dark:from-stone-800 dark:to-stone-900">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-800 dark:text-stone-100">
              Welcome to The Reading Room
            </h1>
            <p className="mt-4 text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
              Your digital sanctuary for stories. Discover new worlds, listen in immersive audio, and build your personal library.
            </p>
            <div className="relative mt-8 w-full max-w-xl mx-auto">
              <Input
                type="search"
                placeholder="Find your next great read..."
                className="h-14 pl-5 pr-12 text-md rounded-full shadow-md border-stone-300 focus:ring-amber-700 focus:border-amber-700 dark:bg-stone-700 dark:border-stone-600"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-amber-800 hover:bg-amber-900"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Bookshelves Section */}
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <BookshelfCarousel title="New Arrivals" books={newArrivals} />
          <BookshelfCarousel title="Bestsellers" books={bestsellers} />
          <BookshelfCarousel title="Curated For You" books={curatedCollection} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;