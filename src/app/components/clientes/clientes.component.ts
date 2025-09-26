import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  form: FormGroup;
  clientes: any[] = [];
  clienteSeleccionado: any = null;

  constructor(private fb: FormBuilder, private svc: ClientesService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
      identificacion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.listar().subscribe((r: any) => this.clientes = r);
  }

  crear(){
    if (this.form.invalid) return;
    this.svc.crear(this.form.value).subscribe({
      next: () => {
        alert('Cliente creado con éxito');
        this.form.reset();
        this.load();
      },
      error: (err) => {
        alert('Error: ' + err.error);
      }
    });
  }

  actualizar() {
    if (this.form.invalid) return;
    this.svc.actualizar(this.clienteSeleccionado.id, this.form.value).subscribe({
      next: () => {
        alert('Cliente actualizado con éxito');
        this.form.reset();
        this.load();
      },
      error: (err) => {
        alert('Error: ' + err.error);
      }
    });
  }

  eliminar() {
    if (this.form.invalid) return;
    this.svc.eliminar(this.clienteSeleccionado.id).subscribe({
      next: () => {
        alert('Cliente eliminado con éxito');
        this.form.reset();
        this.load();
      },
      error: (err) => {
        alert('Error: ' + err.error);
      }
    });
  }

  seleccionarCliente(c: any) {
    this.clienteSeleccionado = c;
    
    this.form.patchValue({
      nombre: c.nombre,
      email: c.email,
      telefono: c.telefono,
      identificacion: c.identificacion
    });
    
    console.log('ID del cliente:', c.id); 
  }
}
