
import React, { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { postIdsAtom } from '@/store/atoms';
import { useServerPosts } from '@/hooks/useServerPosts';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/PostCard';

interface PostListProps {
  initialData?: any;
}

export const PostList: React.FC<PostListProps> = ({ initialData }) => {
  const { 
    isLoading, 
    isError, 
    pagination, 
    changePage, 
    prefetchNextPage
  } = useServerPosts(initialData);
  
  const postIds = useAtomValue(postIdsAtom);

  // Prefetch next page for smoother navigation
  useEffect(() => {
    if (!isLoading && !isError) {
      prefetchNextPage();
    }
  }, [pagination.page, isLoading, isError, prefetchNextPage]);

  if (isLoading && postIds.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="h-64 bg-muted rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold text-destructive">Error loading posts</h3>
        <p className="text-muted-foreground mt-2">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postIds.map(id => (
          <PostCard key={id} postId={id} />
        ))}
      </div>
      
      <div className="flex justify-center gap-2 pt-4">
        <Button 
          variant="outline" 
          onClick={() => changePage(pagination.page - 1)}
          disabled={pagination.page <= 1}
        >
          Previous
        </Button>
        <Button 
          variant="outline"
          disabled
        >
          Page {pagination.page}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => changePage(pagination.page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PostList;
