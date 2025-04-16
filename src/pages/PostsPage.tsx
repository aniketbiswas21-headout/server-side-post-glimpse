
import React from 'react';
import { fetchInitialPosts } from '@/hooks/useServerPosts';
import PostList from '@/components/PostList';
import { useQuery } from '@tanstack/react-query';

/**
 * This function simulates what Next.js getServerSideProps would do
 * In a real Next.js app, this would be executed on the server
 * before the page is sent to the client
 */
const getServerData = async () => {
  // In a real Next.js app, this would be in getServerSideProps
  try {
    const posts = await fetchInitialPosts(1, 10);
    return { posts };
  } catch (error) {
    console.error('Error fetching server data:', error);
    return { posts: [] };
  }
};

const PostsPage: React.FC = () => {
  // This simulates server-side data fetching in Next.js
  const { data: serverData } = useQuery({
    queryKey: ['server-data'],
    queryFn: getServerData,
    staleTime: Infinity, // Don't refetch this initial data
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-primary">Latest Posts</h1>
        <p className="text-muted-foreground mb-8">
          Explore our collection of server-side rendered posts
        </p>
      </div>
      <PostList initialData={serverData?.posts} />
    </div>
  );
};

export default PostsPage;
