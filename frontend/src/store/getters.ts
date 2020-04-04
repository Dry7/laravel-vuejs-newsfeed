import { State } from '@/types';

export default {
  categories: (state: State) => state.categories,
  category: (state: State) => state.navigation.category,
  query: (state: State) => state.navigation.query,
  feed: (state: State) => state.feed,
  loading: (state: State) => state.loading,
  total: (state: State) => state.total,
  details: (state: State) => state.details,
};
