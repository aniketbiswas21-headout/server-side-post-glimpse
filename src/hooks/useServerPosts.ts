
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { fetchPosts } from '@/lib/api';
import { normalizePosts } from '@/lib/normalization';
import { postsAtom, paginationAtom, postIdsAtom } from '@/store/atoms';
import { useEffect } from 'react';

export const postsQueryKey = (page: number, limit: number) => 
  ['posts', { page, limit }];

export const useServerPosts = (initialData?: any) => {
  const [pagination, setPagination] = useAtom(paginationAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const [postIds, setPostIds] = useAtom(postIdsAtom);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: postsQueryKey(pagination.page, pagination.limit),
    queryFn: () => fetchPosts(pagination.page, pagination.limit),
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (query.data) {
      const normalizedPosts = normalizePosts(query.data);
      const ids = query.data.map((post: any) => post.id);
      
      setPosts(prev => ({
        ...prev,
        ...normalizedPosts
      }));
      
      setPostIds(ids);
    }
  }, [query.data, setPosts, setPostIds]);

  const prefetchNextPage = async () => {
    const nextPage = pagination.page + 1;
    await queryClient.prefetchQuery({
      queryKey: postsQueryKey(nextPage, pagination.limit),
      queryFn: () => fetchPosts(nextPage, pagination.limit),
    });
  };

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

export const fetchInitialPosts = async (page = 1, limit = 10) => {
  const posts = await fetchPosts(page, limit);
  return posts;
};
