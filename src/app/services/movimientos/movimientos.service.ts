import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MovimientosService {
  private base = environment.apiUrl;
  constructor(private http: HttpClient) { }

  crearMovimiento(payload: any): Observable<any> {
    return this.http.post(`${this.base}/movimientos`, payload);
  }

  listarPorCuenta(numero: string): Observable<any> {
    return this.http.get(`${this.base}/movimientos/cuenta/${numero}`);
  }
}
