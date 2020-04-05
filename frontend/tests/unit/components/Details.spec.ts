import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import { Feed } from '@/types';
import Details from '@/components/Details.vue';
import DetailsPage from '../../pages/DetailsPage';
import { SHOW_DETAILS } from '@/store/actions';
import feed from '../../fixtures/feed';

Vue.use(Vuetify);

const createComponent = function (details: Feed, slug: string) {
  const localVue = createLocalVue();

  localVue.use(Vuex);
  localVue.use(Vuetify);

  const actions = {
    [SHOW_DETAILS]: jest.fn(),
  };
  const getters = {
    details: () => details,
  };
  const store = new Vuex.Store({
    actions,
    getters,
  });

  const $route = {
    params: {
      slug,
    },
  };

  const wrapper = shallowMount(Details, {
    store,
    localVue,
    mocks: { $route },
  });

  const page = new DetailsPage(wrapper);

  return { wrapper, page, actions, getters };
};

describe('Details.vue', () => {
  it('Call show details', () => {
    const { actions } = createComponent(feed[0], feed[0].slug);

    expect(actions[SHOW_DETAILS].mock.calls.length).toEqual(1);
  });

  it('Run FeedItem', () => {
    const { page } = createComponent(feed[0], feed[0].slug);

    expect(page.feedItem().exists()).toBeTruthy();
    expect(page.feedItem().element.getAttribute('details')).toBeTruthy();
  });
});
