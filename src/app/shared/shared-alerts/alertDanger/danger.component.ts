import { Component, ElementRef, Input } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-alertDanger',
  templateUrl: './danger.component.html',
  styleUrl: './danger.component.scss',
})
export class DangerComponent {
  @Input() message!: string;
  @Input() alertOpen!: boolean;

  constructor(private authSvc: AuthService) {}

  close(a: NgbAlert) {
    a.close;
    this.authSvc.alertOpen$.next(false);
  }
}
