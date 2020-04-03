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
    navigation: {
      offset: 0,
      category: null,
      query: null,
    },
    total: 0,
    loading: false,
    categories: [],
    feed: [],
    details: null,
  },
  getters: {
    categories: (state) => state.categories,
    category: (state) => state.navigation.category,
    query: (state) => state.navigation.query,
    feed: (state) => state.feed,
    loading: (state) => state.loading,
    total: (state) => state.total,
    details: (state) => state.details,
  },
  actions: {
    [actions.LOAD_CATEGORIES]: ({ commit }) => {
      (new CategoryService()).all()
        .pipe(
          switchMap((response: Response) => response.json()),
        )
        .subscribe(
          (response) => commit('setCategories', { categories: response.items }),
          () => commit('loadingError'),
        );
    },
    [actions.LOAD_FEED]: ({ commit, state }, { append = false } = {}) => {
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
    [actions.SET_CATEGORY]: ({ commit }, category: number) => {
      commit('setLoading', { loading: true });
      commit('setNavigation', { category, query: null, offset: 0 });
    },
    [actions.SET_QUERY]: ({ commit, state }, query: string) => {
      commit('setQuery', { query });
      commit('setOffset', { offset: 0 });
    },
    [actions.SEARCH_FEED]: ({ commit, dispatch }) => {
      commit('setOffset', { offset: 0 });
      return dispatch(actions.LOAD_FEED, { append: false });
    },
    [actions.NEXT_PAGE]: ({ commit, state, dispatch }) => {
      commit('setOffset', { offset: state.navigation.offset += 10 });
      return dispatch(actions.LOAD_FEED, { append: true });
    },
    [actions.SET_LOADING]: ({ commit }, loading: boolean) => {
      commit('setLoading', { loading });
    },
    [actions.SHOW_DETAILS]: ({ commit }, { slug }) => {
      (new FeedService()).details(slug)
        .pipe(
          switchMap((response: Response) => response.json()),
        )
        .subscribe(
          (details) => commit('setDetails', { details }),
          () => commit('loadingError'),
        );
    },
  },
  mutations: {
    setNavigation: (state, navigation) => { state.navigation = navigation; },
    setOffset: (state, { offset }) => { state.navigation.offset = offset; },
    setCategories: (state, { categories }) => { state.categories = categories; },
    setCategory: (state, { category }) => { state.navigation.category = category; },
    setQuery: (state, { query }) => { state.navigation.query = query; },
    setFeed: (state, { response }) => {
      state.feed = response.items;
      state.total = response.total;
      state.loading = false;
    },
    appendFeed: (state, { response }) => {
      state.feed = [...state.feed, ...response.items];
      state.total = response.total;
      state.loading = false;
    },
    setLoading: (state, { loading }) => { state.loading = loading; },
    loadingError: (state) => { state.loading = false; },
    setDetails: (state, { details = null } = {}) => { state.details = details; },
  },
});
