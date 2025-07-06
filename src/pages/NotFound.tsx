import React, { type JSX } from 'react';

const NotFound: React.FC = (): JSX.Element => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-black">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
};

export default NotFound;
