import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';

class DetailsPage {
  constructor(private readonly wrapper: Wrapper<Vue>) {
  }

  exists(): boolean {
    return this.wrapper.exists();
  }

  title(): Wrapper<Vue> {
    return this.wrapper.find('v-card-title-stub');
  }

  text(): Wrapper<Vue> {
    return this.wrapper.find('v-card-text-stub');
  }

  feedItem(): Wrapper<Vue> {
    return this.wrapper.find('feeditem-stub');
  }
}

export default DetailsPage;
