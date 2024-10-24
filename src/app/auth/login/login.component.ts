import { Component, inject } from '@angular/core';
import { ILogin } from '../../interfaces/i-login';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../shared/shared-modals/modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  datiLogin: ILogin = {
    email: '',
    password: '',
  };

  alertOpen: boolean = false;
  errorMessage: string = '';

  private modalService = inject(NgbModal);

  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSvc.alertOpen$.subscribe((res) => {
      this.alertOpen = res;
    });
  }

  openModal(name: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.closeModal = this.goToHome;
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  login() {
    this.authSvc.login(this.datiLogin).subscribe({
      next: (res) => {
        this.openModal(res.user.name);
      },
      error: (err) => {
        this.authSvc.alertOpen$.next(true);

        this.errorMessage = err.error;
      },
    });
  }
}
