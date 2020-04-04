import { Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import Details from '@/components/Details.vue';

class DetailsPage {
  constructor(private readonly wrapper: Wrapper<Details>) {
  }

  feedItem(): Wrapper<Vue> {
    return this.wrapper.find('feeditem-stub');
  }
}

export default DetailsPage;
