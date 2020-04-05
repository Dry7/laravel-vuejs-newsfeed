import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import MenuCategoriesPage from './MenuCategoriesPage';

class MenuPage {
  constructor(private readonly wrapper: Wrapper<Vue>) {
  }

  home(): Wrapper<Vue> {
    return this.wrapper.find('.menu__home');
  }

  categories(): MenuCategoriesPage {
    return new MenuCategoriesPage(this.wrapper.find('.menu__categories'));
  }
}

export default MenuPage;
