import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import DetailsPage from './DetailsPage';

class AppPage {
  constructor(private readonly wrapper: Wrapper<Vue>) {
  }

  details(): DetailsPage {
    return new DetailsPage(this.wrapper.find('v-card-stub.details'));
  }
}

export default AppPage;
