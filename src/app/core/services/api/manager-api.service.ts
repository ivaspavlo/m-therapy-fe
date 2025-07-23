import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerApiService {

  constructor(
    private http: HttpClient
  ) { }

}
