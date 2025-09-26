import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentasService } from '../../services/cuentas/cuentas.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {
  form: FormGroup; cuentas: any[] = [];
  cuentaSeleccionada: any = null;

  constructor(private fb: FormBuilder, private svc: CuentasService) {
    this.form = this.fb.group({
      numero: ['', [Validators.required, Validators.minLength(5)]],
      tipo: ['', Validators.required],
      saldoInicial: [0, [Validators.required, Validators.min(0)]],
      clienteId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.listar().subscribe((r: any) => this.cuentas = r);
  }

  seleccionarCuenta(c: any) {
    this.cuentaSeleccionada = c;
    this.form.patchValue({
      numero: c.numero,
      tipo: c.tipo,
      saldoInicial: c.saldoInicial,
      clienteId: c.cliente?.nombre
    });
  }

  crear() {
    if (this.form.invalid) return;
    this.svc.crear(this.form.value).subscribe({
      next: () => {
        alert('Cuenta creada con éxito');
        this.form.reset();
        this.load();
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar la cuenta: ' + (err.error?.message || JSON.stringify(err.error)));
      }
    });
  }

  actualizar() {
    if (this.cuentaSeleccionada) {
      if (this.form.invalid) return;
      this.svc.actualizar(this.cuentaSeleccionada.id, this.form.value).subscribe({
        next: () => {
          alert('Cuenta actualizada con éxito');
          this.form.reset();
          this.load();
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar la cuenta: ' + (err.error?.message || JSON.stringify(err.error)));
        }
      });
    }
  }

  eliminar() {
    if (this.cuentaSeleccionada) {
      if (this.form.invalid) return;
      this.svc.eliminar(this.cuentaSeleccionada.id).subscribe({
        next: () => {
          alert('Cuenta eliminada con éxito');
          this.form.reset();
          this.load();
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar la cuenta: ' + (err.error?.message || JSON.stringify(err.error)));
        }
      });
    }
  }
}
