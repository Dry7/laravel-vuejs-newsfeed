import {
  Category,
  Feed,
  ItemsResponse,
  Navigation,
  State,
} from '@/types';

export default {
  setNavigation: (state: State, navigation: Navigation) => { state.navigation = navigation; },
  setOffset: (state: State, { offset }: { offset: number }) => {
    state.navigation.offset = offset;
  },
  setCategories: (state: State, { categories }: { categories: Category[] }) => {
    state.categories = categories;
  },
  setCategory: (state: State, { category }: { category: number | null }) => {
    state.navigation.category = category;
  },
  setQuery: (state: State, { query }: { query: string }) => { state.navigation.query = query; },
  setFeed: (state: State, { response }: { response: ItemsResponse<Feed> }) => {
    state.feed = response.items;
    state.total = response.total;
    state.loading = false;
  },
  appendFeed: (state: State, { response }: { response: ItemsResponse<Feed> }) => {
    state.feed = [...state.feed, ...response.items];
    state.total = response.total;
    state.loading = false;
  },
  setLoading: (state: State, { loading }: { loading: boolean }) => { state.loading = loading; },
  loadingError: (state: State) => { state.loading = false; },
  setDetails: (state: State, { details }: {  details: Feed | null  } = { details: null}) => { state.details = details; },
};
