import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';

class FeedItemPage {
  constructor(private readonly wrapper: Wrapper<Vue>) {
  }

  card(): Wrapper<Vue> {
    return this.wrapper;
  }

  title(): Wrapper<Vue> {
    return this.wrapper.find('.v-card__title');
  }

  image(): Wrapper<Vue> {
    return this.wrapper.find('.v-image__image');
  }

  text(): Wrapper<Vue> {
    return this.wrapper.find('.v-card__text');
  }
}

export default FeedItemPage;
