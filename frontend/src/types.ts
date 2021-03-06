export interface Category {
  id: number;
  name: string;
}

interface Timestamps {
  published: string;
  modified: string;
}

export interface Media {
  type: string;
  media: {
    '@link': string;
    id: string;
    source: string;
    slug: string;
    type: string;
    attributes: {
      url: string;
      width: number;
      height: number;
      copyright: string;
      caption: string;
      credit: string;
    },
    properties: Timestamps;
  }
}

interface Content {
  type: string;
  content: string;
  attributes: null;
}

export interface Feed {
  id: number;
  title: string;
  slug: string;
  content: Content[];
  categories: {
    primary: string | null;
    additional: string[];
  };
  media: Media[];
}

export interface Navigation {
  offset: number;
  category: number | null;
  query: string | null;
}

export interface State {
  navigation: Navigation;
  total: number;
  loading: boolean;
  categories: Category[];
  feed: Feed[];
  details: Feed | null;
}

export interface ItemsResponse<T> {
  items: T[];
  total: number;
}
