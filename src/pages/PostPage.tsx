
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchInitialPost } from '@/hooks/useServerPost';
import PostDetail from '@/components/PostDetail';

/**
 * This function simulates what Next.js getServerSideProps would do
 * for a dynamic route with params ([id] in Next.js).
 * 
 * In a real Next.js app, this would execute server-side before page render
 */
const getServerData = async (id: number) => {
  // In a real Next.js app, this would be in getServerSideProps
  try {
    const data = await fetchInitialPost(id);
    return data;
  } catch (error) {
    console.error('Error fetching server data:', error);
    return null;
  }
};

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '0', 10);

  // This simulates server-side data fetching in Next.js
  const { data: serverData } = useQuery({
    queryKey: ['server-data', postId],
    queryFn: () => getServerData(postId),
    staleTime: Infinity, // Don't refetch this initial data
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!postId,
  });

  if (!postId) {
    return <div>Invalid post ID</div>;
  }

  return (
    <div className="container py-8 max-w-4xl">
      <PostDetail postId={postId} initialData={serverData} />
    </div>
  );
};

export default PostPage;
