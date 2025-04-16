
// Hook for server-side fetching of individual post
import { useQuery } from '@tanstack/react-query';
import { fetchPost, fetchPostComments, fetchUser } from '@/lib/api';
import { useAtom } from 'jotai';
import { entitiesAtom } from '@/store/atoms';
import { useEffect } from 'react';

// Query key factories
export const postQueryKey = (id: number) => ['post', id];
export const postCommentsQueryKey = (id: number) => ['post', id, 'comments'];
export const userQueryKey = (id: number) => ['user', id];

export const useServerPost = (postId: number, initialData?: any) => {
  const [entities, setEntities] = useAtom(entitiesAtom);

  // Query for fetching post
  const postQuery = useQuery({
    queryKey: postQueryKey(postId),
    queryFn: () => fetchPost(postId),
    initialData: initialData?.post || (postId ? entities.posts[postId] : undefined),
    enabled: !!postId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Query for fetching post comments
  const commentsQuery = useQuery({
    queryKey: postCommentsQueryKey(postId),
    queryFn: () => fetchPostComments(postId),
    initialData: initialData?.comments,
    enabled: !!postId && !!postQuery.data,
  });

  // Query for fetching post author
  const userQuery = useQuery({
    queryKey: userQueryKey(postQuery.data?.userId),
    queryFn: () => fetchUser(postQuery.data?.userId),
    initialData: initialData?.user || 
      (postQuery.data?.userId ? entities.users[postQuery.data.userId] : undefined),
    enabled: !!postQuery.data?.userId,
  });

  // Effect to update entities
  useEffect(() => {
    if (postQuery.data) {
      setEntities((prev) => ({
        ...prev,
        posts: { 
          ...prev.posts, 
          [postId]: postQuery.data 
        }
      }));
    }

    if (userQuery.data) {
      setEntities((prev) => ({
        ...prev,
        users: { 
          ...prev.users, 
          [userQuery.data.id]: userQuery.data 
        }
      }));
    }

    if (commentsQuery.data) {
      const normalizedComments = commentsQuery.data.reduce((acc: any, comment: any) => {
        acc[comment.id] = comment;
        return acc;
      }, {});

      setEntities((prev) => ({
        ...prev,
        comments: { 
          ...prev.comments,
          ...normalizedComments
        }
      }));
    }
  }, [
    postId,
    postQuery.data, 
    userQuery.data, 
    commentsQuery.data, 
    setEntities
  ]);

  return {
    post: postQuery.data,
    isLoading: postQuery.isLoading || userQuery.isLoading,
    isError: postQuery.isError || userQuery.isError,
    error: postQuery.error || userQuery.error,
    user: userQuery.data,
    comments: commentsQuery.data,
    commentsLoading: commentsQuery.isLoading,
  };
};

// Function to fetch initial post data (simulating SSR)
export const fetchInitialPost = async (id: number) => {
  const post = await fetchPost(id);
  const user = await fetchUser(post.userId);
  const comments = await fetchPostComments(id);
  
  return {
    post,
    user,
    comments,
  };
};
