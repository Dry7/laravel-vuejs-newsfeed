import Vue from 'vue';
import Vuetify from 'vuetify';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import Menu from '@/components/Menu.vue';
import MenuPage from '../../pages/MenuPage';
import categories from '../../fixtures/categories';

Vue.use(Vuetify);

const createComponent = function (
  { mocks = {}, propsData = {} }:
  { mocks?: Object, propsData?: Object } = {}
) {
  const localVue = createLocalVue();

  const wrapper = mount(Menu, {
    propsData,
    localVue,
    mocks,
  });

  const page = new MenuPage(wrapper);

  return { wrapper, page };
};

describe('Menu.vue', () => {
  it('Show home item', () => {
    const { page } = createComponent({ mocks: { $route: { name: 'test' } } });

    expect(page.home().text()).toMatch('Home');
  });

  it('Click on home', () => {
    const $router = {
      push: jest.fn(),
    };
    const { page } = createComponent({ mocks: { $route: { name: 'test' }, $router } });

    page.home().trigger('click');

    expect($router.push.mock.calls.length).toEqual(1);
  });

  it('Show categories on search page', () => {
    const { page } = createComponent({ mocks: { $route: { name: 'Search' } }, propsData: { categories } });

    expect(page.categories().exists()).toBeTruthy();
    expect(page.categories().title().text()).toMatch('Categories');

    for (const category of categories) {
      expect(page.categories().category(category.id).text()).toMatch(category.name);
    }
  });

  it('Hide categories on details page', () => {
    const { page } = createComponent({ mocks: { $route: { name: 'Details' } }, propsData: { categories } });

    expect(page.categories().exists()).toBeFalsy();
  });

  it('Click on category', () => {
    const { wrapper, page } = createComponent({ mocks: { $route: { name: 'Search' } }, propsData: { categories } });

    page.categories().category(categories[0].id).trigger('click');

    expect('setCategory' in wrapper.emitted()).toBeTruthy();
  });
});
