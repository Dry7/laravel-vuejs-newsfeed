import { Wrapper } from '@vue/test-utils';
import FeedItem from '@/components/FeedItem.vue';
import Vue from 'vue';

class FeedItemPage {
  constructor(private readonly wrapper: Wrapper<FeedItem>) {
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
