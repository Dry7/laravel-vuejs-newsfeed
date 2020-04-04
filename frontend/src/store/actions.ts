import CategoryService from '@/services/CategoryService';
import { debounceTime, switchMap } from 'rxjs/operators';
import FeedService from '@/services/FeedService';
import { Commit, Dispatch } from 'vuex';
import { State } from '@/types';

export const LOAD_CATEGORIES = 'load_categories';
export const SEARCH_FEED = 'search_feed';
export const LOAD_FEED = 'load_feed';
export const NEXT_PAGE = 'next_page';
export const SET_CATEGORY = 'set_category';
export const SET_QUERY = 'set_query';
export const SET_LOADING = 'set_loading';
export const SHOW_DETAILS = 'show_details';

interface ActionContext {
  commit: Commit;
  state: State;
  dispatch: Dispatch;
}

export default {
  [LOAD_CATEGORIES]: ({ commit }: ActionContext) => {
    (new CategoryService()).all()
      .pipe(
        switchMap((response: Response) => response.json()),
      )
      .subscribe(
        (response) => commit('setCategories', { categories: response.items }),
        () => commit('loadingError'),
      );
  },
  [LOAD_FEED]: ({ commit, state }: ActionContext, { append = false } = {}) => {
    if (append && state.navigation.offset >= state.total) {
      return;
    }

    commit('setLoading', { loading: true });
    (new FeedService()).all(state.navigation)
      .pipe(
        debounceTime(1000),
        switchMap((response: Response) => response.json()),
      )
      .subscribe(
        (response) => commit(append ? 'appendFeed' : 'setFeed', { response }),
        () => commit('loadingError'),
      );
  },
  [SET_CATEGORY]: ({ commit }: ActionContext, category: number) => {
    commit('setLoading', { loading: true });
    commit('setNavigation', { category, query: null, offset: 0 });
  },
  [SET_QUERY]: ({ commit }: ActionContext, query: string) => {
    commit('setQuery', { query });
    commit('setOffset', { offset: 0 });
  },
  [SEARCH_FEED]: ({ commit, dispatch }: ActionContext) => {
    commit('setOffset', { offset: 0 });
    return dispatch(LOAD_FEED, { append: false });
  },
  [NEXT_PAGE]: ({ commit, state, dispatch }: ActionContext) => {
    commit('setOffset', { offset: state.navigation.offset += 10 });
    return dispatch(LOAD_FEED, { append: true });
  },
  [SET_LOADING]: ({ commit }: ActionContext, loading: boolean) => {
    commit('setLoading', { loading });
  },
  [SHOW_DETAILS]: ({ commit }: ActionContext, { slug }: { slug: string }) => {
    (new FeedService()).details(slug)
      .pipe(
        switchMap((response: Response) => response.json()),
      )
      .subscribe(
        (details) => commit('setDetails', { details }),
        () => commit('loadingError'),
      );
  },
};
