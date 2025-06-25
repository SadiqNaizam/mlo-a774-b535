import React from 'react';
import BookCover3D from '@/components/BookCover3D'; // Assuming this component exists

// Define the shape of a book object for type safety
interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
}

interface BookshelfCarouselProps {
  title: string;
  books: Book[];
}

const BookshelfCarousel: React.FC<BookshelfCarouselProps> = ({ title, books }) => {
  console.log('BookshelfCarousel loaded with title:', title);

  if (!books || books.length === 0) {
    return (
      <div className="bg-amber-900/40 p-6 rounded-lg shadow-inner">
        <h2 className="text-2xl font-bold text-amber-100 mb-4 font-serif">{title}</h2>
        <p className="text-amber-200/70">There are no books to display on this shelf.</p>
      </div>
    );
  }

  return (
    <div className="w-full my-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 font-serif">{title}</h2>
      <div className="bg-gradient-to-b from-amber-800 to-amber-900 p-6 rounded-lg shadow-lg">
        {/* This div creates the horizontal scrolling container */}
        <div className="flex overflow-x-auto space-x-8 pb-4 scrollbar-thin scrollbar-thumb-amber-950 scrollbar-track-amber-800">
          {/* We add a "shelf" visual element below the books */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-950/50 rounded-b-lg " style={{ zIndex: 0 }} />

          {books.map((book) => (
            <div key={book.id} className="flex-shrink-0" style={{ zIndex: 1 }}>
              <BookCover3D
                id={book.id}
                title={book.title}
                author={book.author}
                coverImageUrl={book.coverImageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Providing default props with some sample data for easy testing and demonstration
BookshelfCarousel.defaultProps = {
  title: 'Featured Books',
  books: [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', coverImageUrl: 'https://via.placeholder.com/150x220/4B0082/FFFFFF?text=Gatsby' },
    { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', coverImageUrl: 'https://via.placeholder.com/150x220/8B4513/FFFFFF?text=Mockingbird' },
    { id: '3', title: '1984', author: 'George Orwell', coverImageUrl: 'https://via.placeholder.com/150x220/000080/FFFFFF?text=1984' },
    { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', coverImageUrl: 'https://via.placeholder.com/150x220/800080/FFFFFF?text=Pride' },
    { id: '5', title: 'The Catcher in the Rye', author: 'J.D. Salinger', coverImageUrl: 'https://via.placeholder.com/150x220/FF4500/FFFFFF?text=Catcher' },
    { id: '6', title: 'Moby Dick', author: 'Herman Melville', coverImageUrl: 'https://via.placeholder.com/150x220/008080/FFFFFF?text=Moby+Dick' },
    { id: '7', title: 'War and Peace', author: 'Leo Tolstoy', coverImageUrl: 'https://via.placeholder.com/150x220/800000/FFFFFF?text=War+Peace' },
  ],
};

export default BookshelfCarousel;