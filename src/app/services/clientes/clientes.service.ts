import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientesService {
  private base = environment.apiUrl;
  constructor(private http: HttpClient) { }

  crear(payload: any): Observable<any> {
    return this.http.post(`${this.base}/clientes`, payload);
  }

  listar(): Observable<any> {
    return this.http.get(`${this.base}/clientes`);
  }

  actualizar(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.base}/clientes/${id}`, payload);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.base}/clientes/${id}`);
  }
}
