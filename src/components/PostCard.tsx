
import React from 'react';
import { useAtomValue } from 'jotai';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { postsAtom, usersAtom } from '@/store/atoms';
import { Post, User } from '@/types';

interface PostCardProps {
  postId: number;
}

export const PostCard: React.FC<PostCardProps> = ({ postId }) => {
  const posts = useAtomValue(postsAtom);
  const users = useAtomValue(usersAtom);
  const post = posts[postId] as Post | undefined;
  const user = post?.userId ? users[post.userId] as User | undefined : undefined;

  if (!post) return null;

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <Link to={`/post/${post.id}`} className="block h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-muted-foreground line-clamp-3">{post.body}</p>
        </CardContent>
        <CardFooter className="flex items-center pt-2 text-sm text-muted-foreground">
          {user ? (
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{user.name}</span>
            </div>
          ) : (
            <div className="h-6 w-32 bg-muted animate-pulse rounded" />
          )}
          
          <div className="ml-auto flex gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/post/${post.id}`}>View (API)</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/view-post/${post.id}`}>View (Store)</Link>
            </Button>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default PostCard;
