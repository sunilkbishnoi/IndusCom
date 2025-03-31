
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-steel-background text-white flex flex-col items-center justify-center p-4">
      <div className="w-20 h-20 bg-steel-card rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl">404</span>
      </div>
      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-400 mb-6 text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="bg-steel-positive text-black font-bold py-2 px-6 rounded-xl hover:opacity-90"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
