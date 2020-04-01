import Vue from 'vue';
import Vuex from 'vuex';
import { State } from '@/types';
import CategoryService from '@/services/CategoryService';
import { switchMap } from 'rxjs/operators';
import { LOAD_CATEGORIES, SEARCH_FEED } from '@/store/actions';
import FeedService from '@/services/FeedService';

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
    categories: [],
    feed: [],
  },
  getters: {
    categories: (state) => state.categories,
    feed: (state) => state.feed,
  },
  actions: {
    [LOAD_CATEGORIES]: ({ commit }) => {
      (new CategoryService()).all()
        .pipe(
          switchMap((response: Response) => response.json()),
        )
        .subscribe((categories) => {
          commit('setCategories', { categories });
        });
    },
    [SEARCH_FEED]: ({ commit }) => {
      (new FeedService()).all()
        .pipe(
          switchMap((response: Response) => response.json()),
        )
        .subscribe((feed) => {
          commit('setFeed', { feed });
        });
    },
  },
  mutations: {
    setCategories: (state, { categories }) => { state.categories = categories; },
    setFeed: (state, { feed }) => { state.feed = feed; },
  },
});
