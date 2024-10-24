import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DangerComponent } from './alertDanger/danger.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DangerComponent],
  imports: [CommonModule, NgbAlertModule],
  exports: [DangerComponent],
})
export class SharedAlertsModule {}
