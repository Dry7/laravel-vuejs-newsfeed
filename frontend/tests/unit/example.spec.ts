import { createLocalVue, shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import Vuex, { Store } from 'vuex';
import { State } from '@/types';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe('HelloWorld.vue', () => {
  let actions;
  let store: Store<State>;

  beforeEach(() => {
    actions = {};
    store = new Vuex.Store({
      actions
    });
  });

  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
      store,
      localVue,
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
