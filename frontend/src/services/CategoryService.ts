import { fromFetch } from 'rxjs/fetch';
import { Observable } from 'rxjs';

class CategoryService {
  endpoint = process.env.VUE_APP_ENDPOINT;

  all(): Observable<Response> {
    return fromFetch(`${this.endpoint}categories`, { method: 'POST' });
  }
}

export default CategoryService;
