import Vue from 'vue';
import Vuex from 'vuex';
import { State } from '@/types';
import actions from '@/store/actions';
import getters from '@/store/getters';
import mutations from '@/store/mutations';

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
  getters,
  actions,
  mutations,
});
