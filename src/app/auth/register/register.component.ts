import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { iUser } from '../../interfaces/i-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: Partial<iUser> = {};

  constructor(private authSvc: AuthService, private router: Router) {}

  register() {
    this.authSvc.register(this.registerForm).subscribe((res) => {
      this.router.navigate(['/auth/login']);
    });
  }
}
