import { fromFetch } from 'rxjs/fetch';
import { Observable } from 'rxjs';

class CategoryService {
  endpoint = process.env.VUE_APP_ENDPOINT;

  all(): Observable<Response> {
    console.log(process.env.VUE_APP_ENDPOINT);
    console.log(`${this.endpoint}categories`);
    return fromFetch(`${this.endpoint}categories`, { method: 'POST' });
  }
}

export default CategoryService;
