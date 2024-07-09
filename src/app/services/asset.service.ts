import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private apiUrl = 'https://combuilding.beetrack.vn/api/asset/lazyGet'; // Replace with your API URL

  constructor(private http: HttpClient) {
  }

  getData(start: number, length: number, searchText: string | undefined = undefined): Observable<any> {
    const body = new HttpParams()
      .set('start', (start - 1) * length)
      .set('length', length)
      .set('draw', '1')
      .set('customsearch[useTextSearchOr]', false)
      .set('columns[0][data]', 'created_at')
      .set('columns[0][name]', 'created_at')
      .set('columns[0][searchable]', true)
      .set('columns[0][orderable]', true)
      .set('order[0][column]', 0)
      .set('order[0][dir]', 'desc')
      .set('customsearch[searchText]', searchText ? searchText : '');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(this.apiUrl, body.toString(), {headers});
  }
}
