import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'cuentas', component: CuentasComponent },
  { path: 'movimientos', component: MovimientosComponent },
  { path: '**', redirectTo: 'clientes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
