import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, ShoppingCart, Eye } from 'lucide-react';

interface BookCover3DProps {
  title: string;
  coverImageUrl: string;
  type: 'store' | 'library';
}

const BookCover3D: React.FC<BookCover3DProps> = ({
  title,
  coverImageUrl,
  type,
}) => {
  console.log('BookCover3D loaded for:', title);

  return (
    <div className="group relative cursor-pointer" style={{ perspective: '1000px' }}>
      <motion.div
        whileHover={{
          rotateY: -15,
          rotateX: 5,
          scale: 1.05,
          boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative h-72 w-48 md:h-80 md:w-56"
      >
        <img
          src={coverImageUrl || 'https://via.placeholder.com/224x320'}
          alt={`Cover of ${title}`}
          className="h-full w-full rounded-md object-cover shadow-lg"
        />
        {/* Overlay for buttons */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-black/60 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex flex-col gap-3 text-center">
            {type === 'library' && (
              <Button asChild className="transform-gpu transition-transform duration-200 group-hover:scale-100 scale-90">
                <Link to="/reader">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Online
                </Link>
              </Button>
            )}

            {type === 'store' && (
              <>
                <Button asChild className="transform-gpu transition-transform duration-200 group-hover:scale-100 scale-90">
                  <Link to="/checkout">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Purchase
                  </Link>
                </Button>
                <Button variant="secondary" asChild className="transform-gpu transition-transform duration-200 delay-75 group-hover:scale-100 scale-90">
                  <Link to="/book-details">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookCover3D;