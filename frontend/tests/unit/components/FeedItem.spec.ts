import Vue from 'vue';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { Feed, State } from '@/types';
import Vuetify from 'vuetify';
import FeedItem from '@/components/FeedItem.vue';
import feed from '../../fixtures/feed';
import FeedItemPage from '../../pages/FeedItemPage';

Vue.use(Vuetify);

const createComponent = function (options: { propsData: { item: Feed, details: boolean }, mocks?: Object }) {
  const localVue = createLocalVue();

  localVue.use(Vuex);
  localVue.use(Vuetify);

  // actions = {};
  // store = new Vuex.Store({
  //   actions
  // });

  const wrapper = mount(FeedItem, {
    propsData: options.propsData,
    localVue,
    mocks: options.mocks
  });
  const page = new FeedItemPage(wrapper);

  return { wrapper, page };
};

describe('FeedItem.vue', () => {
  it('List item', () => {
    const { page } = createComponent({ propsData: { item: feed[0], details: false } });

    expect(page.title().text()).toEqual('Gift the avid audiophile in your life these headphones from Shure');
    expect(page.image().html()).toMatch('http://via.placeholder.com/1200x628');
    expect(page.text().exists()).toBeFalsy();
    expect(page.card().element.classList.contains('list'));
  });

  it('Details', () => {
    const { page } = createComponent({ propsData: { item: feed[0], details: true } });

    expect(page.title().text()).toEqual('Gift the avid audiophile in your life these headphones from Shure');
    expect(page.image().html()).toMatch('http://via.placeholder.com/1200x628');
    expect(page.text().exists()).toBeTruthy();
    expect(page.card().element.classList.contains('details'));
  });

  it('Click on image on list', () => {
    const $router = {
      push: jest.fn(),
    };
    const { page } = createComponent({ propsData: { item: feed[0], details: false }, mocks: { $router } });

    page.image().trigger('click');

    expect($router.push.mock.calls.length).toEqual(1);
  });

  it('Click on image on details', () => {
    const $router = {
      push: jest.fn(),
    };
    const { page } = createComponent({ propsData: { item: feed[0], details: true }, mocks: { $router } });

    page.image().trigger('click');

    expect($router.push.mock.calls.length).toEqual(0);
  });

  it('Details content with data-src', () => {
    const img = '<img src="https://ya.ru/image.png" data-src="https://habr.com/image.png" />';
    const { page } = createComponent({
      propsData: { item: { ...feed[0], content: [{ type: 'html', content: img, attributes: null }] }, details: true }
    });

    expect(page.text().html()).toMatch(' src="https://habr.com/image.png"');
  });

  it('Without media', () => {
    const { page } = createComponent({ propsData: { item: { ...feed[0], media: [] }, details: false } });

    expect(page.image().html()).toMatch('http://via.placeholder.com/1200x628');
  });
});
