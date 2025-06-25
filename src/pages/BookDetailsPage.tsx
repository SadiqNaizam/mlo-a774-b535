import React from 'react';
import { Link } from 'react-router-dom';

// Import Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Import Icons
import { Star, BookOpenCheck, Headphones, ShoppingCart } from 'lucide-react';

// Mock Data for the page
const bookData = {
  title: 'The Whispering Woods',
  author: 'Elara Vance',
  coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1280&h=1920&auto=format&fit=crop',
  rating: 4.5,
  reviewsCount: 128,
  genres: ['Fantasy', 'Adventure', 'Mystery'],
  synopsis: "In a world where magic is fading, a young librarian named Kael discovers a hidden manuscript that speaks of the Whispering Woods, a mythical forest said to hold the last vestiges of ancient power. As a creeping darkness threatens to consume the land, Kael must embark on a perilous journey into the heart of the woods to uncover its secrets. But the forest is not without its guardians, and not all of them are friendly. With the help of a cynical rogue and a wise-cracking sprite, Kael must navigate treacherous paths and solve ancient riddles to restore magic before it's lost forever."
};

const reviewsData = [
  { id: 1, user: 'Alice', avatar: 'https://github.com/shadcn.png', rating: 5, comment: "An absolute masterpiece! The world-building is incredible and I couldn't put it down." },
  { id: 2, user: 'Bob', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', rating: 4, comment: "A really enjoyable read. The characters were well-developed, though the pacing felt a bit slow in the middle." },
  { id: 3, user: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d', rating: 5, comment: "I loved the unique magic system. Can't wait for the sequel!" },
];

const BookDetailsPage: React.FC = () => {
  console.log('BookDetailsPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-800">
      <Header />
      <main className="flex-1 container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Left Column: Book Cover */}
          <div className="md:col-span-1 lg:col-span-1">
            <Card className="overflow-hidden shadow-lg">
              <img src={bookData.coverUrl} alt={`Cover of ${bookData.title}`} className="w-full h-auto object-cover" />
            </Card>
          </div>

          {/* Right Column: Book Info & Actions */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{bookData.title}</h1>
            <p className="text-lg text-stone-600">by {bookData.author}</p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(bookData.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-stone-300'}`} />
                ))}
              </div>
              <span className="text-sm text-stone-500">{bookData.rating.toFixed(1)} ({bookData.reviewsCount} reviews)</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {bookData.genres.map(genre => <Badge key={genre} variant="secondary">{genre}</Badge>)}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" asChild>
                <Link to="/checkout">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Purchase
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/reader">
                  <BookOpenCheck className="mr-2 h-5 w-5" /> Read Online
                </Link>
              </Button>
              <Button size="lg" variant="ghost" onClick={() => console.log("Listen to sample clicked")}>
                <Headphones className="mr-2 h-5 w-5" /> Listen to Sample
              </Button>
            </div>
          </div>
        </div>

        {/* Lower Section: Tabs for Synopsis & Reviews */}
        <div className="mt-12">
          <Tabs defaultValue="synopsis" className="w-full">
            <TabsList>
              <TabsTrigger value="synopsis">Synopsis</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="synopsis" className="pt-6">
              <Card>
                <CardContent className="p-6 text-base leading-relaxed">
                  <p>{bookData.synopsis}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {reviewsData.map(review => (
                    <div key={review.id} className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={`@${review.user}`} />
                        <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">{review.user}</p>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-stone-300'}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-stone-600 mt-1">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetailsPage;