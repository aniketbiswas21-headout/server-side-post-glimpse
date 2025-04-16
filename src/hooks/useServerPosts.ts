
// Hook for server-side fetching of posts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import { fetchPosts } from '@/lib/api';
import { normalizePosts } from '@/lib/normalization';
import { entitiesAtom, paginationAtom, postIdsAtom } from '@/store/atoms';
import { useEffect } from 'react';

// Query key factory
export const postsQueryKey = (page: number, limit: number) => 
  ['posts', { page, limit }];

export const useServerPosts = (initialData?: any) => {
  const [pagination, setPagination] = useAtom(paginationAtom);
  const [entities, setEntities] = useAtom(entitiesAtom);
  const [postIds, setPostIds] = useAtom(postIdsAtom);
  const queryClient = useQueryClient();

  // Query for fetching posts
  const query = useQuery({
    queryKey: postsQueryKey(pagination.page, pagination.limit),
    queryFn: () => fetchPosts(pagination.page, pagination.limit),
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Effect to normalize data and update atoms
  useEffect(() => {
    if (query.data) {
      const normalizedPosts = normalizePosts(query.data);
      const ids = query.data.map((post: any) => post.id);
      
      setEntities(prev => ({
        ...prev,
        posts: { ...prev.posts, ...normalizedPosts }
      }));
      
      setPostIds(ids);
    }
  }, [query.data, setEntities, setPostIds]);

  // Function to prefetch next page
  const prefetchNextPage = async () => {
    const nextPage = pagination.page + 1;
    await queryClient.prefetchQuery({
      queryKey: postsQueryKey(nextPage, pagination.limit),
      queryFn: () => fetchPosts(nextPage, pagination.limit),
    });
  };

  // Function to change page
  const changePage = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return {
    posts: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    postIds,
    pagination,
    changePage,
    prefetchNextPage,
  };
};

// Function to fetch initial posts data (simulating SSR)
export const fetchInitialPosts = async (page = 1, limit = 10) => {
  const posts = await fetchPosts(page, limit);
  return posts;
};
