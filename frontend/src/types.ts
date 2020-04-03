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

export interface Feed {
  id: number;
  title: string;
  slug: string;
  categories: {
    primary: string | null;
    additional: string[];
  };
  media: Media[];
}

export interface State {
  categories: Category[];
  category: number | null;
  query: string | null;
  feed: Feed[];
}
