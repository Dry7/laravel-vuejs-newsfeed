import { fromFetch } from 'rxjs/fetch';
import { Observable } from 'rxjs';

class FeedService {
  endpoint = 'http://localhost:8282/api/v1/';

  all(category: number | null, query: string | null): Observable<Response> {
    return fromFetch(`${this.endpoint}search?${FeedService.buildQuery(category, query)}`, { method: 'POST' });
  }

  private static buildQuery(category: number | null, query: string | null): string {
    const url = [];
    if (category !== null && category > 0) {
      url.push(`category=${category}`);
    }
    if (query !== null && query.length > 0) {
      url.push(`query=${encodeURIComponent(query)}`);
    }
    return url.join('&');
  }
}

export default FeedService;
