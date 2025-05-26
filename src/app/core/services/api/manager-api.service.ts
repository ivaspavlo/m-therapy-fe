import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubscribeAdEmailsReq, IResponse } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ManagerApiService {

  constructor(
    private http: HttpClient
  ) { }

}
