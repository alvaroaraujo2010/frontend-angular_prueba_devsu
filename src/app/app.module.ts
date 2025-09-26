import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ClientesComponent, CuentasComponent, MovimientosComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
