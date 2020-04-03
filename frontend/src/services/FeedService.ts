import { fromFetch } from 'rxjs/fetch';
import { Observable } from 'rxjs';

interface SearchRequest {
  offset: number;
  category: number | null;
  query: string | null;
}

class FeedService {
  endpoint = 'http://localhost:8282/api/v1/';

  all(navigation: SearchRequest): Observable<Response> {
    return fromFetch(`${this.endpoint}search?${FeedService.buildQuery(navigation)}`, { method: 'POST' });
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
