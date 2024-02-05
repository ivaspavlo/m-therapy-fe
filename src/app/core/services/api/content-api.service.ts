import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse, IContent } from '@app/interfaces';
import { API_URL } from '@env/environment';
import { Cache } from '@app/core/decorators'


@Injectable({
  providedIn: 'root'
})
export class ContentApiService {

  constructor(
    private http: HttpClient
  ) { }

  @Cache()
  public getContent(): Observable<IResponse<IContent>> {
    return this.http.get<IResponse<IContent>>(`${API_URL}/content`);
  }
}
