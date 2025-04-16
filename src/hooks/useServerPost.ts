
import { useQuery } from '@tanstack/react-query';
import { fetchPost, fetchPostComments, fetchUser } from '@/lib/api';
import { useAtom } from 'jotai';
import { postsAtom, usersAtom, commentsAtom } from '@/store/atoms';
import { useEffect } from 'react';

// Query key factories
export const postQueryKey = (id: number) => ['post', id];
export const postCommentsQueryKey = (id: number) => ['post', id, 'comments'];
export const userQueryKey = (id: number) => ['user', id];

export const useServerPost = (postId: number, initialData?: any) => {
  const [posts, setPosts] = useAtom(postsAtom);
  const [users, setUsers] = useAtom(usersAtom);
  const [comments, setComments] = useAtom(commentsAtom);
  
  // Check if post already exists in our store
  const existingPost = posts[postId];

  // Query for fetching post
  const postQuery = useQuery({
    queryKey: postQueryKey(postId),
    queryFn: () => fetchPost(postId),
    initialData: initialData?.post || existingPost,
    enabled: !!postId && !existingPost, // Only fetch if we don't have the post
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Get the post (either from query or existing store)
  const post = postQuery.data || existingPost;

  // Query for fetching post comments
  const commentsQuery = useQuery({
    queryKey: postCommentsQueryKey(postId),
    queryFn: () => fetchPostComments(postId),
    initialData: initialData?.comments,
    enabled: !!postId && !!post,
  });

  // Query for fetching post author
  const userQuery = useQuery({
    queryKey: userQueryKey(post?.userId),
    queryFn: () => fetchUser(post?.userId),
    initialData: initialData?.user || 
      (post?.userId ? users[post.userId] : undefined),
    enabled: !!post?.userId && !users[post.userId],
  });

  // Effect to update entities
  useEffect(() => {
    if (post && !posts[postId]) {
      setPosts((prev) => ({
        ...prev,
        [postId]: post
      }));
    }

    if (userQuery.data) {
      setUsers((prev) => ({
        ...prev,
        [userQuery.data.id]: userQuery.data
      }));
    }

    if (commentsQuery.data) {
      const normalizedComments = commentsQuery.data.reduce((acc: any, comment: any) => {
        acc[comment.id] = comment;
        return acc;
      }, {});

      setComments((prev) => ({
        ...prev,
        ...normalizedComments
      }));
    }
  }, [
    postId,
    post, 
    userQuery.data, 
    commentsQuery.data,
    setPosts,
    setUsers,
    setComments,
    posts
  ]);

  return {
    post,
    isLoading: (!post && postQuery.isLoading) || userQuery.isLoading,
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
