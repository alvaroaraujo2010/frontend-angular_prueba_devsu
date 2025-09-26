import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Interfaces para tipar la respuesta
export interface Movimiento {
  id: number;
  fecha: string;
  tipo: string;
  valor: number;
  saldo: number;
  referencia: string;
}

export interface EstadoCuentaReporte {
  numeroCuenta: string;
  tipoCuenta: string;
  cliente: string;   // ajustado al backend
  fechaDesde: string;
  fechaHasta: string;
  movimientos: Movimiento[];
  totalCreditos: number;
  totalDebitos: number;
  saldoFinal: number;
}

@Injectable({ providedIn: 'root' })
export class MovimientosService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ✅ Crear movimiento con query params
  crearMovimiento(
    numeroCuenta: string,
    tipo: string,
    valor: number,
    referencia?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('numeroCuenta', numeroCuenta)
      .set('tipo', tipo)
      .set('valor', valor.toString());

    if (referencia) {
      params = params.set('referencia', referencia);
    }

    return this.http.post(`${this.base}/movimientos`, null, { params });
  }

  listarPorCuenta(numero: string): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(`${this.base}/movimientos/cuenta/${numero}`);
  }


  listarTodos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(`${this.base}/movimientos/all`);
  }

  generarReporte(numeroCuenta: string): Observable<EstadoCuentaReporte> {
    return this.http.get<EstadoCuentaReporte>(
      `${this.base}/movimientos/reporte?numeroCuenta=${numeroCuenta}`
    );
  }
}
