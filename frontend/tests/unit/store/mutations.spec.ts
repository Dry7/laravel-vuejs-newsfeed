import categories from '../../fixtures/categories';
import feed from '../../fixtures/feed';
import mutations from '@/store/mutations';

const defaultState = {
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

describe('Store mutations', () => {
  it('setNavigation', () => {
    const state = {...defaultState};

    mutations.setNavigation(state, {
      offset: 0,
      category: null,
      query: null,
    });

    expect(state.navigation).toMatchObject({
      offset: 0,
      category: null,
      query: null,
    });
  });

  it('setOffset', () => {
    const state = {...defaultState};

    mutations.setOffset(state, { offset: 20 });

    expect(state.navigation.offset).toBe(20);
  });

  it('setCategories', () => {
    const state = {...defaultState};

    mutations.setCategories(state, { categories: [] });

    expect(state.categories).toMatchObject([]);
  });

  it('setCategory', () => {
    const state = {...defaultState};

    mutations.setCategory(state, { category: 2 });

    expect(state.navigation.category).toBe(2);
  });

  it('setQuery', () => {
    const state = {...defaultState};

    mutations.setQuery(state, { query: 'search query' });

    expect(state.navigation.query).toBe('search query');
  });

  it('setFeed', () => {
    const state = {...defaultState, loading: true};

    mutations.setFeed(state, { response: { items: [], total: 0 } });

    expect(state.feed).toMatchObject([]);
    expect(state.total).toBe(0);
    expect(state.loading).toBeFalsy();
  });

  it('appendFeed', () => {
    const state = {...defaultState, loading: true};

    mutations.appendFeed(state, { response: { items: feed, total: 2 } });

    expect(state.feed).toMatchObject([...feed, ...feed]);
    expect(state.total).toBe(2);
    expect(state.loading).toBeFalsy();
  });

  it('setLoading', () => {
    const state = {...defaultState};

    mutations.setLoading(state, { loading: true });

    expect(state.loading).toBeTruthy();
  });

  it('loadingError', () => {
    const state = {...defaultState, loading: true};

    mutations.loadingError(state);

    expect(state.loading).toBeFalsy();
  });

  it('setDetails', () => {
    const state = {...defaultState, loading: true};

    mutations.setDetails(state, { details: feed[0] });

    expect(state.details).toMatchObject(feed[0]);
  });
});
