
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { postsAtom, usersAtom, commentsAtom } from '@/store/atoms';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PostComment from '@/components/PostComment';

const SinglePostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '0', 10);
  const posts = useAtomValue(postsAtom);
  const users = useAtomValue(usersAtom);
  const allComments = useAtomValue(commentsAtom);
  
  // Get the post from our normalized state
  const post = postId ? posts[postId] : undefined;
  
  // Get the user from our normalized state
  const user = post?.userId ? users[post.userId] : undefined;
  
  // Get the comments for this post from our normalized state
  const comments = Object.values(allComments)
    .filter(comment => comment.postId === postId);

  if (!postId || !post) {
    return (
      <div className="container py-8 max-w-4xl">
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold text-destructive">Post not found</h3>
          <p className="text-muted-foreground mt-2">The post you're looking for doesn't exist or hasn't been loaded yet.</p>
          <Button asChild className="mt-4">
            <Link to="/">Back to posts</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl">
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

          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <PostComment key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No comments available for this post</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
