import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';

class DetailsPage {
  constructor(private readonly wrapper: Wrapper<Vue>) {
  }

  feedItem(): Wrapper<Vue> {
    return this.wrapper.find('feeditem-stub');
  }
}

export default DetailsPage;
