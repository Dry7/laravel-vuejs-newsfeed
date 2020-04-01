import Vue from 'vue';
import Vuex from 'vuex';
import { State } from '@/types';
import CategoryService from '@/services/CategoryService';
import { switchMap } from 'rxjs/operators';
import { LOAD_CATEGORIES } from '@/store/actions';

Vue.use(Vuex);

export default new Vuex.Store<State>({
  state: {
    categories: [],
  },
  getters: {
    categories: (state) => state.categories,
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
  },
  mutations: {
    setCategories: (state, { categories }) => { state.categories = categories; },
  },
});
