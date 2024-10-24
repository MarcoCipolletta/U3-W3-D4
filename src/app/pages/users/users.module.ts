import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedCardModule } from '../../shared/shared-card/shared-card.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, SharedCardModule],
})
export class UsersModule {}
