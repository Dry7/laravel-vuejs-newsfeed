import categories from '../../fixtures/categories';
import feed from '../../fixtures/feed';
import actions, {
  LOAD_CATEGORIES, LOAD_FEED,
  NEXT_PAGE,
  SEARCH_FEED,
  SET_CATEGORY, SET_LOADING,
  SET_QUERY, SHOW_DETAILS,
} from '@/store/actions';
import fetchMock from 'jest-fetch-mock';
import { state } from '../../helpers';

global.fetch = require('jest-fetch-mock');

describe('Store actions', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  });

  it('LOAD_CATEGORIES', (done) => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    fetchMock.mockResponse(JSON.stringify({ items: categories, total: 5 }));

    actions[LOAD_CATEGORIES]({ commit, state, dispatch });

    setTimeout(() => {
      expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8282/api/v1/categories');
      expect(commit.mock.calls).toMatchObject([['setCategories', { categories }]]);
      done();
    });
  });

  it('LOAD_CATEGORIES error', (done) => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    fetchMock.mockReject(new Error());

    actions[LOAD_CATEGORIES]({ commit, state, dispatch });

    setTimeout(() => {
      expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8282/api/v1/categories');
      expect(commit.mock.calls).toMatchObject([['loadingError']]);
      done();
    });
  });

  it('LOAD_FEED append=false', (done) => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    fetchMock.mockResponse(JSON.stringify({ items: feed, total: 1 }));

    actions[LOAD_FEED]({ commit, state: { ...state }, dispatch }, { append: false });

    setTimeout(() => {
      expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8282/api/v1/search?offset=10&category=5&query=crisis');
      expect(commit.mock.calls).toMatchObject([
        ['setLoading', { loading: true }],
        ['setFeed', { response: { items: feed, total: 1 } }],
      ]);
      done();
    });
  });

  it('LOAD_FEED append=true', (done) => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    fetchMock.mockResponse(JSON.stringify({ items: feed, total: 1 }));

    actions[LOAD_FEED]({ commit, state: { ...state }, dispatch }, { append: true });

    setTimeout(() => {
      expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8282/api/v1/search?offset=10&category=5&query=crisis');
      expect(commit.mock.calls).toMatchObject([
        ['setLoading', { loading: true }],
        ['appendFeed', { response: { items: feed, total: 1 } }],
      ]);
      done();
    });
  });

  it('LOAD_FEED offset greater than limit', (done) => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    fetchMock.mockResponse(JSON.stringify({ items: feed, total: 1 }));

    actions[LOAD_FEED]({
      commit,
      state: { ...state, navigation: { ...state.navigation, offset: 40 }, total: 20 },
      dispatch,
    }, { append: true });

    setTimeout(() => {
      expect(fetchMock.mock.calls).toMatchObject([]);
      expect(commit.mock.calls).toMatchObject([]);
      done();
    });
  });

  it('LOAD_FEED error', (done) => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    fetchMock.mockReject(new Error());

    actions[LOAD_FEED]({ commit, state, dispatch });

    setTimeout(() => {
      expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8282/api/v1/search?offset=10&category=5&query=crisis');
      expect(commit.mock.calls).toMatchObject([
        ['setLoading', { loading: true }],
        ['loadingError'],
      ]);
      done();
    });
  });

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

  it('SHOW_DETAILS', (done) => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    fetchMock.mockResponse(JSON.stringify(feed[0]));

    actions[SHOW_DETAILS](
      { commit, state, dispatch },
      { slug: 'gift-the-avid-audiophile-in-your-life-these-headphones-from-shure' },
    );

    setTimeout(() => {
      expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8282/api/v1/details/gift-the-avid-audiophile-in-your-life-these-headphones-from-shure');
      expect(commit.mock.calls).toMatchObject([['setDetails', { details: feed[0] }]]);
      done();
    });
  });

  it('SHOW_DETAILS error', (done) => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    fetchMock.mockReject(new Error());

    actions[SHOW_DETAILS](
      { commit, state, dispatch },
      { slug: 'gift-the-avid-audiophile-in-your-life-these-headphones-from-shure' },
    );

    setTimeout(() => {
      expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8282/api/v1/details/gift-the-avid-audiophile-in-your-life-these-headphones-from-shure');
      expect(commit.mock.calls).toMatchObject([['loadingError']]);
      done();
    });
  });
});
