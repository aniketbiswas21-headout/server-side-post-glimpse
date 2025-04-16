
import { atom } from 'jotai';
import { NormalizedEntities, initialNormalizedState } from '@/lib/normalization';
import { PaginationState } from '@/types';

// Renamed from entitiesAtom to postAtom
export const postAtom = atom<NormalizedEntities>(initialNormalizedState);

// Atom for pagination state
export const paginationAtom = atom<PaginationState>({
  page: 1,
  limit: 10,
});

// Atom for post IDs list (used for ordering)
export const postIdsAtom = atom<number[]>([]);
