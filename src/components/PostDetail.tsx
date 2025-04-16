
import React from 'react';
import { useServerPost } from '@/hooks/useServerPost';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PostComment from './PostComment';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PostDetailProps {
  postId: number;
  initialData?: any;
}

export const PostDetail: React.FC<PostDetailProps> = ({ postId, initialData }) => {
  const {
    post,
    user,
    comments,
    isLoading,
    isError,
    commentsLoading,
  } = useServerPost(postId, initialData);

  if (isLoading && !post) {
    return <div className="h-96 bg-muted rounded-lg animate-pulse" />;
  }

  if (isError || !post) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold text-destructive">Error loading post</h3>
        <p className="text-muted-foreground mt-2">Please try again later</p>
        <Button asChild className="mt-4">
          <Link to="/">Back to posts</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" className="mb-4">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to posts
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">{post.title}</CardTitle>
          {user && (
            <CardDescription className="flex items-center mt-4">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div>{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p className="leading-7 whitespace-pre-line">{post.body}</p>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        <Separator className="mb-6" />

        {commentsLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : comments && comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment: any) => (
              <PostComment key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
