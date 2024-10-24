import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedAlertsModule } from '../shared/shared-alerts/shared-alerts.module';
import { SharedModalsModule } from '../shared/shared-modals/shared-modals.module';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SharedAlertsModule,
    SharedModalsModule,
  ],
})
export class AuthModule {}
