import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ServicesComponent } from './home/services/services.component';
import { ProductsComponent } from './home/products/products.component';
import { AppointmentTableComponent } from './appointments/appointment-table/appointment-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentsModalComponent } from './appointments/appointments-modal/appointments-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ServicesComponent,
    ProductsComponent,
    AppointmentTableComponent,
    AppointmentsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents: [
    AppointmentsModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
