
import React, { useEffect } from 'react';
import PostsPage from './PostsPage';

/**
 * Index page - Entry point to our application
 * This component wraps the PostsPage component, which contains the server-side 
 * data fetching logic for the posts list.
 */
const Index = () => {
  // We could add any additional page-level effects here
  useEffect(() => {
    // Example: Set page title
    document.title = 'PostHub - Server-Side Posts App';
  }, []);

  return <PostsPage />;
};

export default Index;
