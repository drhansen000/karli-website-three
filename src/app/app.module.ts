import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ServicesComponent } from './home/services/services.component';
import { ProductsComponent } from './home/products/products.component';
import { AppointmentsTableMobileComponent } from './appointments/appointments-table-mobile/appointments-table-mobile.component';
import { AppointmentTableComponent } from './appointments/appointment-table/appointment-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentsModalComponent } from './appointments/appointments-modal/appointments-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ServicesComponent,
    ProductsComponent,
    AppointmentsTableMobileComponent,
    AppointmentTableComponent,
    AppointmentsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
