import Vue from 'vue';
import Vuetify from 'vuetify';
import { mockIntersectionObserver } from '../helpers';

Vue.use(Vuetify);

describe('main.vue', () => {
  it('App render', () => {
    document.body.innerHTML = '<div id="app"></div>';

    mockIntersectionObserver();

    require('../../src/main');

    const body = document.body;

    expect(body.querySelector('.menu__home')?.querySelector('.v-list-item__title')?.innerHTML).toBe('Home');
    expect(body.querySelector('.vue-recycle-scroller')).toBeTruthy();
    document.body.innerHTML = '';
  });
});
