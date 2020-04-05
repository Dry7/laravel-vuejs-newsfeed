import Vuex, { Store } from 'vuex';
import vuetify from '@/plugins/vuetify';
import VueVirtualScroller from "vue-virtual-scroller";
import infiniteScroll from 'vue-infinite-scroll';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import router from '@/router';
import store from '@/store';
import vueDebounce from 'vue-debounce';

import fetchMock from 'jest-fetch-mock';
import {
  LOAD_CATEGORIES,
  LOAD_FEED,
  NEXT_PAGE,
  SET_CATEGORY,
  SET_QUERY,
  SHOW_DETAILS
} from '@/store/actions';
import { State } from '@/types';
import Search from '@/components/Search.vue';
import feed from '../../fixtures/feed';
import { state } from '../../helpers';

store.replaceState(state);

global.fetch = require('jest-fetch-mock');

const createComponent = function (options: { mocks?: Object, store?: Store<State> }) {
  const localVue = createLocalVue();

  localVue.use(vuetify);
  localVue.use(VueVirtualScroller);
  localVue.use(infiniteScroll);
  localVue.use(vueDebounce);

  const actions = {
    [LOAD_CATEGORIES]: jest.fn(),
    [LOAD_FEED]: jest.fn(),
    [SHOW_DETAILS]: jest.fn(),
    [NEXT_PAGE]: jest.fn(),
    [SET_QUERY]: jest.fn(),
    [SET_CATEGORY]: jest.fn(),
  };
  const getters = {
    feed: () => [],
    categories: () => [],
    details: () => feed[0],
    loading: (state: State) => state.loading,
    category: () => null,
  };
  const store = new Vuex.Store<State>({
    actions,
    getters,
  });
  const wrapper = shallowMount(Search, {
    store,
    router,
    localVue,
    mocks: options.mocks,
    stubs: ['v-text-field'],
  });

  return { wrapper, actions, getters, store };
};

describe('Feed.vue', () => {
  beforeEach(() => {
    fetchMock.mockAbort();
  });

  it('loadMore when loading false', () => {
    const { wrapper, actions, store } = createComponent({});

    store.replaceState({ ...state, loading: false });

    (wrapper as any).vm.loadMore();

    expect(actions[NEXT_PAGE].mock.calls.length).toEqual(1);
  });

  it('loadMore when loading true', () => {
    const { wrapper, actions, store } = createComponent({});

    store.replaceState({ ...state, loading: true });

    (wrapper as any).vm.loadMore();

    expect(actions[NEXT_PAGE]).toHaveBeenCalledTimes(0);
  });

  it('setQuery', (done) => {
    const { wrapper, actions, store } = createComponent({});

    store.replaceState({ ...state, loading: true });

    (wrapper as any).vm.setQuery('query');

    setTimeout(() => {
      expect(actions[SET_QUERY]).toHaveBeenCalledTimes(1);
      expect(actions[LOAD_FEED]).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
