import Vue from 'vue';
import Vuex from 'vuex';
import { State } from '@/types';
import CategoryService from '@/services/CategoryService';
import { debounceTime, switchMap } from 'rxjs/operators';
import * as actions from '@/store/actions';
import FeedService from '@/services/FeedService';

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
    categories: [],
    category: null,
    query: null,
    feed: [],
  },
  getters: {
    categories: (state) => state.categories,
    category: (state) => state.category,
    query: (state) => state.query,
    feed: (state) => state.feed,
  },
  actions: {
    [actions.LOAD_CATEGORIES]: ({ commit }) => {
      (new CategoryService()).all()
        .pipe(
          switchMap((response: Response) => response.json()),
        )
        .subscribe((categories) => {
          commit('setCategories', { categories });
        });
    },
    [actions.SEARCH_FEED]: ({ commit, state }) => {
      (new FeedService()).all(state.category, state.query)
        .pipe(
          debounceTime(1000),
          switchMap((response: Response) => response.json()),
        )
        .subscribe((feed) => {
          commit('setFeed', { feed });
        });
    },
    [actions.SET_CATEGORY]: ({ commit }, category: number) => {
      commit('setCategory', { category });
    },
    [actions.SET_QUERY]: ({ commit }, query: string) => {
      commit('setQuery', { query });
    },
  },
  mutations: {
    setCategories: (state, { categories }) => { state.categories = categories; },
    setCategory: (state, { category }) => { state.category = category; },
    setQuery: (state, { query }) => { state.query = query; },
    setFeed: (state, { feed }) => { state.feed = feed; },
  },
});
