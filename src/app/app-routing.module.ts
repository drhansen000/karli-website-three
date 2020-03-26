import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentTableComponent } from './appointments/appointment-table/appointment-table.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './common/header/header.component';
import { NavComponent } from './common/nav/nav.component';
import { FooterComponent } from './common/footer/footer.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'appointments', component: AppointmentTableComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'contact', component: ContactComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
export const routingComponents = [HeaderComponent, 
  NavComponent,
  FooterComponent,
  HomeComponent,
  AppointmentTableComponent,
  ProductListComponent,
  ContactComponent];
