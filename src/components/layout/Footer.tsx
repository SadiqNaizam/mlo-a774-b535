import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-stone-500">
            &copy; {currentYear} The Reading Room. All rights reserved.
        </p>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-stone-600">
          <Link to="/about" className="hover:text-stone-900 transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-stone-900 transition-colors">Contact</Link>
          <Link to="/faq" className="hover:text-stone-900 transition-colors">FAQ</Link>
          <Link to="/terms" className="hover:text-stone-900 transition-colors">Terms of Service</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;