import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';

class MenuCategoriesPage {
  constructor(private readonly wrapper: Wrapper<Vue>) {
  }

  exists(): boolean {
    return this.wrapper.exists();
  }

  title(): Wrapper<Vue> {
    return this.wrapper.find('.menu__categories__title');
  }

  category(categoryId: number): Wrapper<Vue> {
    return this.wrapper.find('.menu__categories__' + categoryId);
  }
}

export default MenuCategoriesPage;
