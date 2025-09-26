import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MovimientosComponent } from './movimientos.component';
import { MovimientosService } from '../../services/movimientos/movimientos.service';

describe('MovimientosComponent', () => {
  let component: MovimientosComponent;
  let fixture: ComponentFixture<MovimientosComponent>;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      listarTodos: jest.fn().mockReturnValue(of([{ numeroCuenta: '12345', tipoMovimiento: 'DEBITO', valorMovimiento: 100 }])),
      crearMovimiento: jest.fn().mockReturnValue(of({}))
    };

    await TestBed.configureTestingModule({
      declarations: [MovimientosComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: MovimientosService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería cargar movimientos al iniciar', () => {
    expect(component.movimientos.length).toBe(1);
    expect(component.movimientos[0].numeroCuenta).toBe('12345');
  });

  it('debería validar formulario inválido si falta número de cuenta', () => {
    component.form.patchValue({ numeroCuenta: '', valor: 0 });
    expect(component.form.invalid).toBe(true);
  });

  it('debería llamar al servicio para crear movimiento si el formulario es válido', () => {
    component.form.patchValue({ numeroCuenta: '12345', tipo: 'DEBITO', valor: 100 });
    component.submit();
    expect(mockService.crearMovimiento).toHaveBeenCalled();
  });
});
