import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Amsterdam Lore. All rights reserved.</p>
        <div className="mt-2 space-x-3">
          <a href="/" className="hover:underline">Home</a>
          <a href="/stories" className="hover:underline">Stories</a>
          <a href="/submit" className="hover:underline">Submit</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
