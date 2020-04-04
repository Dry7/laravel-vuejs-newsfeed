import { Wrapper } from '@vue/test-utils';
import Vue from 'vue';

class FeedPage {
  constructor(private readonly wrapper: Wrapper<Vue>) {
  }

  scroller(): Wrapper<Vue> {
    return this.wrapper.find('dynamicscroller-stub');
  }
}

export default FeedPage;
