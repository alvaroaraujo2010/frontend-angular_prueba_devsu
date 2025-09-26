import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovimientosService, EstadoCuentaReporte } from '../../services/movimientos/movimientos.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {
  form: FormGroup;
  movimientos: any[] = [];
  loading = false;
  seleccionado: any = null;
  reporte: any = null;

  constructor(private fb: FormBuilder, private svc: MovimientosService) {
    this.form = this.fb.group({
      numeroCuenta: ['', Validators.required],
      tipo: ['DEBITO', Validators.required],
      valor: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  cargarMovimientos() {
    this.loading = true;
    this.svc.listarTodos().subscribe({
      next: (res) => {
        this.movimientos = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar movimientos', err);
        this.loading = false;
      }
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
        this.form.reset({ tipo: 'DEBITO', valor: 0 });
        this.cargarMovimientos();
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar el movimiento: ' + (err.error?.message || JSON.stringify(err.error)));
      }
    });
  }

  generarReporte() {
    const numeroCuenta = this.form.get('numeroCuenta')?.value;
    if (!numeroCuenta) {
      alert('Ingrese un número de cuenta para generar el reporte');
      return;
    }

    this.svc.generarReporte(numeroCuenta).subscribe({
      next: (data) => {
        this.reporte = data;
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([data]);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Reporte');

        const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const file: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(file, `reporte_${numeroCuenta}.xlsx`);
      },
      error: (err) => {
        console.error('Error generando el reporte', err);
        alert('No se pudo generar el reporte.');
      }
    });
  }

  seleccionarMovimiento(movimiento: any) {
    this.form.patchValue({
      numeroCuenta: movimiento.numeroCuenta,
      tipo: movimiento.tipoMovimiento,
      valor: movimiento.valorMovimiento
    });
  }
}
