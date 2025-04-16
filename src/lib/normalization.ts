
// Normalization utilities for data management
import { Post, User, Comment } from '@/types';

export type NormalizedEntities = {
  posts: Record<number, Post>;
  users: Record<number, User>;
  comments: Record<number, Comment>;
};

export type EntityMap<T> = Record<number, T>;

// Initialize empty normalized state
export const initialNormalizedState: NormalizedEntities = {
  posts: {},
  users: {},
  comments: {},
};

// Normalize a list of posts
export const normalizePosts = (posts: Post[]): EntityMap<Post> => {
  return posts.reduce((acc, post) => {
    acc[post.id] = post;
    return acc;
  }, {} as EntityMap<Post>);
};

// Normalize a list of users
export const normalizeUsers = (users: User[]): EntityMap<User> => {
  return users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {} as EntityMap<User>);
};

// Normalize a list of comments
export const normalizeComments = (comments: Comment[]): EntityMap<Comment> => {
  return comments.reduce((acc, comment) => {
    acc[comment.id] = comment;
    return acc;
  }, {} as EntityMap<Comment>);
};

// Merge normalized entities
export const mergeEntities = <T>(
  existing: EntityMap<T>,
  incoming: EntityMap<T>
): EntityMap<T> => {
  return {
    ...existing,
    ...incoming,
  };
};
