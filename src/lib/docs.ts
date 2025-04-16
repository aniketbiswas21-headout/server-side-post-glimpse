
/**
 * This file provides documentation about how the application architecture works.
 * It's not actually imported anywhere, but serves as a reference.
 */

/**
 * Server-Side Data Fetching
 * ------------------------
 * 
 * This application simulates Next.js server-side data fetching patterns using React Query.
 * 
 * In a real Next.js application, you would use:
 * - getServerSideProps() or getStaticProps() to fetch data on the server
 * - Pass that data as props to your page components
 * 
 * Here, we simulate this pattern with:
 * - fetchInitialPosts() and fetchInitialPost() functions that would normally run server-side
 * - useQuery with initialData for hydration, similar to how Next.js would hydrate the page
 */

/**
 * Data Normalization
 * -----------------
 * 
 * We use a normalized data structure to efficiently store and access entities:
 * 
 * 1. Entities are stored in a flat structure by ID:
 *    {
 *      posts: { 1: {...}, 2: {...} },
 *      users: { 1: {...}, 2: {...} },
 *      comments: { 1: {...}, 2: {...} }
 *    }
 * 
 * 2. This allows O(1) lookup time for any entity by ID
 * 
 * 3. We maintain separate arrays of IDs for entities that need ordering
 */

/**
 * State Management with Jotai
 * --------------------------
 * 
 * Jotai provides atomic, composable state management:
 * 
 * 1. entitiesAtom - Stores all normalized entities
 * 2. postIdsAtom - Stores ordering information for posts
 * 3. paginationAtom - Tracks current pagination state
 * 
 * Jotai's atoms are updated when data is fetched from the API,
 * creating a single source of truth for the application.
 */
