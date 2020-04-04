import categories from '../../fixtures/categories';
import feed from '../../fixtures/feed';
import getters from '@/store/getters';

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

describe('Store getters', () => {
  it('categories', () => {
    expect(getters.categories(state)).toBe(categories);
  });
  it('category', () => {
    expect(getters.category(state)).toBe(5);
  });
  it('query', () => {
    expect(getters.query(state)).toBe('crisis');
  });
  it('feed', () => {
    expect(getters.feed(state)).toBe(feed);
  });
  it('loading', () => {
    expect(getters.loading(state)).toBeFalsy();
  });
  it('total', () => {
    expect(getters.total(state)).toBe(100);
  });
  it('details', () => {
    expect(getters.details(state)).toBe(feed[0]);
  });
});
