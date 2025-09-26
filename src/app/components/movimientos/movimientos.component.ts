import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovimientosService } from '../../services/movimientos/movimientos.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private svc: MovimientosService) {
    this.form = this.fb.group({
      numeroCuenta: ['', Validators.required],
      tipo: ['DEBITO', Validators.required],
      valor: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.svc.crearMovimiento(this.form.value).subscribe({
      next: () => {
        alert('Movimiento registrado con éxito');
        this.form.reset({
          tipo: 'DEBITO', valor: 0
        });
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar el movimiento: ' + (err.error?.message || JSON.stringify(err.error)));
      }
    });
  }
}
