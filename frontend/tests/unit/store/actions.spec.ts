import categories from '../../fixtures/categories';
import feed from '../../fixtures/feed';
import actions, {
  NEXT_PAGE,
  SEARCH_FEED,
  SET_CATEGORY, SET_LOADING,
  SET_QUERY,
  SHOW_DETAILS
} from '@/store/actions';

const state = {
  navigation: {
    offset: 10,
    category: 5,
    query: 'crisis',
  },
  total: 100,
  loading: false,
  categories,
  feed,
  details: feed[0],
};

describe('Store actions', () => {
  it('SET_CATEGORY', () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    actions[SET_CATEGORY]({ commit, state, dispatch }, 5);

    expect(commit.mock.calls).toMatchObject([
      ['setLoading', { loading: true }],
      ['setNavigation', { category: 5, query: null, offset: 0 }],
    ]);
  });

  it('SET_QUERY', () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    actions[SET_QUERY]({ commit, state, dispatch }, 'search');

    expect(commit.mock.calls).toMatchObject([
      ['setQuery', { query: 'search' }],
      ['setOffset', { offset: 0 }],
    ]);
  });

  it('SEARCH_FEED', () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    actions[SEARCH_FEED]({ commit, state, dispatch });

    expect(commit.mock.calls).toMatchObject([['setOffset', { offset: 0 }]]);
    expect(dispatch.mock.calls).toMatchObject([['load_feed', { append: false }]]);
  });

  it('NEXT_PAGE', () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    actions[NEXT_PAGE]({ commit, state, dispatch });

    expect(commit.mock.calls).toMatchObject([['setOffset', { offset: 20 }]]);
    expect(dispatch.mock.calls).toMatchObject([['load_feed', { append: true }]]);
  });

  it('SET_LOADING', () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    actions[SET_LOADING]({ commit, state, dispatch }, true);

    expect(commit.mock.calls).toMatchObject([['setLoading', { loading: true }]]);
  });
});
