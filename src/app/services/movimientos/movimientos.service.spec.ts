import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovimientosService } from './movimientos.service';
import { environment } from '../../../environments/environment';

describe('MovimientosService', () => {
  let service: MovimientosService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovimientosService]
    });
    service = TestBed.inject(MovimientosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear un movimiento', () => {
    const payload = { numeroCuenta: '12345', tipo: 'DEBITO', valor: 100 };
    service.crearMovimiento(payload).subscribe(res => {
      expect(res).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`${baseUrl}/movimientos`);
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('debería listar movimientos por cuenta', () => {
    const mockData = [{ numeroCuenta: '12345', valorMovimiento: 200 }];
    service.listarPorCuenta('12345').subscribe(res => {
      expect(res).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}/movimientos/cuenta/12345`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
