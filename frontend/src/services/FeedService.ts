import { fromFetch } from 'rxjs/fetch';
import { Observable } from 'rxjs';

interface SearchRequest {
  offset: number;
  category: number | null;
  query: string | null;
}

class FeedService {
  endpoint = process.env.VUE_APP_ENDPOINT;

  all(navigation: SearchRequest): Observable<Response> {
    return fromFetch(`${this.endpoint}search?${FeedService.buildQuery(navigation)}`, { method: 'POST' });
  }

  details(slug: string): Observable<Response> {
    return fromFetch(`${this.endpoint}details/${slug}`);
  }

  private static buildQuery(navigation: SearchRequest): string {
    const url = [`offset=${navigation.offset}`];
    if (navigation.category !== null && navigation.category > 0) {
      url.push(`category=${navigation.category}`);
    }
    if (navigation.query !== null && navigation.query.length > 0) {
      url.push(`query=${encodeURIComponent(navigation.query)}`);
    }
    return url.join('&');
  }
}

export default FeedService;
