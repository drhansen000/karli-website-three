import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './common/header/header.component';
import { NavComponent } from './common/nav/nav.component';
import { FooterComponent } from './common/footer/footer.component';
import { ServiceDetailComponent } from './appointments/service-detail/service-detail.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { AccountComponent } from './account/account/account.component';
import { LoginComponent } from './account/login/login.component';
import { CartComponent } from './account/cart/cart.component';
import { FutureAppointmentsComponent } from './account/future-appointments/future-appointments.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { AppointmentsComponent } from './appointments/appointments/appointments.component';
import { LoginAuthGuardService } from './services/login-auth-guard.service';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'appointments', component: AppointmentsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'service/:id', component: ServiceDetailComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'future-appointments', component: FutureAppointmentsComponent},
  {path: 'account', canActivate: [LoginAuthGuardService], component: AccountComponent},
  {path: '**', redirectTo: '/home' } // Default Route
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
export const routingComponents = [
  HeaderComponent,
  NavComponent,
  FooterComponent,
  HomeComponent,
  AppointmentsComponent,
  ContactComponent,
  CartComponent,
  LoginComponent,
  ServiceDetailComponent,
  ProductDetailComponent,
  RegistrationComponent,
  FutureAppointmentsComponent,
  AccountComponent
];
