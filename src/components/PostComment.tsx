
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Comment } from '@/types';

interface PostCommentProps {
  comment: Comment;
}

const PostComment: React.FC<PostCommentProps> = ({ comment }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{comment.name}</CardTitle>
        <CardDescription className="text-xs">{comment.email}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm">{comment.body}</p>
      </CardContent>
    </Card>
  );
};

export default PostComment;
