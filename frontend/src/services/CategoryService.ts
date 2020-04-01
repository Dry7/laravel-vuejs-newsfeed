import { fromFetch } from 'rxjs/fetch';
import { Observable } from 'rxjs';

class CategoryService {
  endpoint = 'http://localhost:8282/api/v1/';

  all(): Observable<Response> {
    return fromFetch(`${this.endpoint}categories`, { method: 'POST' });
  }
}

export default CategoryService;
