import { fromFetch } from 'rxjs/fetch';
import { Observable } from 'rxjs';

class FeedService {
  endpoint = 'http://localhost:8282/api/v1/';

  all(): Observable<Response> {
    return fromFetch(`${this.endpoint}search`, { method: 'POST' });
  }
}

export default FeedService;
