import React, { Suspense } from 'react';

// Define a fallback UI to display while the component is loading
const LoadingFallback = () => {
  return <div>Loading...</div>;
};

// Define the Blog component wrapped in a Suspense boundary
const BlogWithSuspense = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className='max-w-6xl mx-auto p-3 space-y-4'>
        <h1 className='text-2xl font-medium text-amber-600'>Blog</h1>
        <p>
          Welcome to our movie database website! We are a team of passionate movie
          enthusiasts who have come together to create a one-stop destination for
          all your movie-related needs.
        </p>
      </div>
    </Suspense>
  );
};

export default BlogWithSuspense;
