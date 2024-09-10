import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse, IContent } from '@app/interfaces';
import { API_URL } from '@env/environment';
import { CacheApiCall } from '@app/core/decorators'
import { CacheService } from '../cache.service';

@Injectable({
  providedIn: 'root'
})
export class ContentApiService {

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) { }

  @CacheApiCall()
  public getContent(): Observable<IResponse<IContent>> {
    return this.cacheService.cacheObservable(
      `${API_URL}/content`,
      this.http.get<IResponse<IContent>>(`${API_URL}/content`)
    );
  }
}
