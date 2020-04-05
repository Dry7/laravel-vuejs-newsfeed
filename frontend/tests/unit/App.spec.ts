import Vuex, { Store } from 'vuex';
import vuetify from '@/plugins/vuetify';
import VueVirtualScroller from "vue-virtual-scroller";
import infiniteScroll from 'vue-infinite-scroll';
import { createLocalVue, mount } from '@vue/test-utils';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vueDebounce from 'vue-debounce';

import fetchMock from 'jest-fetch-mock';
import feed from '../fixtures/feed';
import AppPage from '../pages/AppPage';
import {
  LOAD_CATEGORIES,
  LOAD_FEED,
  NEXT_PAGE,
  SET_CATEGORY,
  SET_QUERY,
  SHOW_DETAILS
} from '@/store/actions';
import { State } from '@/types';
import { mockIntersectionObserver, state } from '../helpers';

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
  const wrapper = mount(App, {
    store,
    router,
    localVue,
    mocks: options.mocks,
    stubs: ['v-app', 'v-app-bar', 'v-app-bar-nav-icon', 'v-toolbar-title', 'v-content',
      'v-text-field', 'v-navigation-drawer', 'v-container', 'v-list-item-group', 'v-list-item',
      'v-list-item-action', 'v-icon', 'v-list-item-content', 'v-list-item-title', 'v-row', 'v-col',
      'v-card', 'v-img', 'v-card-title', 'v-card-text', 'v-footer',
    ],
  });

  const page = new AppPage(wrapper);

  return { wrapper, page, actions, getters, store };
};

describe('Feed.vue', () => {
  beforeEach(() => {
    fetchMock.mockAbort();
    mockIntersectionObserver();
  });

  it('Call load categories', () => {

    const { actions } = createComponent({});

    expect(actions[LOAD_CATEGORIES].mock.calls.length).toEqual(1);
  });

  it('Search page', async () => {
    const { page } = createComponent({});

    expect(page.details().exists()).toBeFalsy();
  });

  it('Details page', async () => {
    await router.push('details/gift-the-avid-audiophile-in-your-life-these-headphones-from-shure');
    const { page } = createComponent({});

    expect(page.details().title().text()).toBe('Gift the avid audiophile in your life these headphones from Shure');
    expect(page.details().text().exists()).toBeTruthy();
  });

  it('scrollToTop', () => {
    const { wrapper } = createComponent({});

    window.scrollTo = jest.fn();

    (wrapper as any).vm.scrollToTop();

    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('setCategory', (done) => {
    const { wrapper, actions } = createComponent({});

    window.scrollTo = jest.fn();

    (wrapper as any).vm.setCategory({id: 1, name: "New"});

    setTimeout(() => {
      expect(actions[SET_CATEGORY]).toHaveBeenCalledTimes(1);
      expect(actions[LOAD_FEED]).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$data.query).toBeNull();
      expect(wrapper.vm.$data.drawer).toBeFalsy();
      done();
    });
  });
});
