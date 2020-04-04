import { Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import Menu from '@/components/Menu.vue';
import MenuCategoriesPage from './MenuCategoriesPage';

class MenuPage {
  constructor(private readonly wrapper: Wrapper<Menu>) {
  }

  home(): Wrapper<Vue> {
    return this.wrapper.find('.menu__home');
  }

  categories(): MenuCategoriesPage {
    return new MenuCategoriesPage(this.wrapper.find('.menu__categories'));
  }
}

export default MenuPage;
