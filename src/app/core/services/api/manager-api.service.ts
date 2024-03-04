import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@env/environment';
import { ISubscribeAdEmailsReq, IResponse } from '@app/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ManagerApiService {

  constructor(
    private http: HttpClient
  ) { }

}
