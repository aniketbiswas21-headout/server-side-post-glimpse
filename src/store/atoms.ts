
import { atom } from 'jotai';
import { EntityMap, initialNormalizedState } from '@/lib/normalization';
import { PaginationState, Post, User, Comment } from '@/types';

// Individual entity atoms
export const postsAtom = atom<EntityMap<Post>>(initialNormalizedState.posts);
export const usersAtom = atom<EntityMap<User>>(initialNormalizedState.users);
export const commentsAtom = atom<EntityMap<Comment>>(initialNormalizedState.comments);

// Atom for pagination state
export const paginationAtom = atom<PaginationState>({
  page: 1,
  limit: 10,
});

// Atom for post IDs list (used for ordering)
export const postIdsAtom = atom<number[]>([]);
