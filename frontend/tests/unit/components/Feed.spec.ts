import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueVirtualScroller from "vue-virtual-scroller";
import infiniteScroll from 'vue-infinite-scroll';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import Feed from '@/components/Feed.vue';
import { LOAD_FEED } from '@/store/actions';
import feed from '../../fixtures/feed';
import { Feed as FeedType } from '@/types';
import FeedPage from '../../pages/FeedPage';

Vue.use(Vuetify);

const createComponent = function (options: { feed: FeedType[], mocks?: Object }) {
  const localVue = createLocalVue();

  localVue.use(Vuex);
  localVue.use(VueVirtualScroller);
  localVue.use(infiniteScroll);

  const actions = {
    [LOAD_FEED]: jest.fn(),
  };
  const getters = {
    feed: () => feed,
  };
  const store = new Vuex.Store({
    actions,
    getters,
  });

  const wrapper = shallowMount(Feed, {
    store,
    localVue,
    mocks: options.mocks
  });

  const page = new FeedPage(wrapper);

  return { wrapper, page, actions, getters };
};

describe('Feed.vue', () => {
  it('Dispatch load feed action', () => {
    const { actions } = createComponent({ feed: feed });

    expect(actions[LOAD_FEED].mock.calls.length).toEqual(1);
  });

  it('Scroller', () => {
    const { page } = createComponent({ feed: feed });

    expect(page.scroller().exists()).toBeTruthy();
    expect(page.scroller().props().items).toEqual(feed);
  });
});
