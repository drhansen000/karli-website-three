import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { SalonServicesComponent } from './home/salon-services/salon-services.component';
import { AppointmentTableComponent } from './appointments/appointment-table/appointment-table.component';
import { AppointmentsModalComponent } from './appointments/appointments-modal/appointments-modal.component';
import { ProductsComponent } from './products/products/products.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SalonServicesComponent,
    AppointmentTableComponent,
    AppointmentsModalComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [
    AppointmentsModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
