import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { ResponseApi } from '../Interfaces/response-api';
import { Rendimiento } from '../Interfaces/rendimiento';

@Injectable({
  providedIn: 'root'
})
export class RendimientoService {

  private baseUrl: string = 'https://localhost:7088/api/Rendimiento';

  constructor(private http:HttpClient) { }

  getList():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(this.baseUrl);
  }

  add(request: Rendimiento): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.baseUrl, request);
  }

  update(request: Rendimiento): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(this.baseUrl, request);
  }

  delete(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.baseUrl}/${id}`);
  }
}
