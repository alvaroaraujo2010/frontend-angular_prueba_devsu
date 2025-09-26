import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CuentasService {
  private base = environment.apiUrl;
  constructor(private http: HttpClient) { }

  crear(payload: any): Observable<any> {
    return this.http.post(`${this.base}/cuentas`, payload);
  }

  listar(): Observable<any> {
    return this.http.get(`${this.base}/cuentas`);
  }

  actualizar(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.base}/cuentas/${id}`, payload);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.base}/cuentas/${id}`);
  }

}
