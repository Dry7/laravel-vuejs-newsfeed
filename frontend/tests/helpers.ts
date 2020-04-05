import categories from './fixtures/categories';
import feed from './fixtures/feed';

export function mockIntersectionObserver() {
  const observe = jest.fn();
  const unobserve = jest.fn();
  const disconnect = jest.fn();

  (window as any).IntersectionObserver = jest.fn(() => ({
    observe,
    disconnect,
    unobserve,
  }));

  return window;
}

export const state = {
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
