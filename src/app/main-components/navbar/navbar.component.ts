import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private authSvc: AuthService) {}

  isLoggedIn: boolean = false;

  ngOnInit() {
    this.authSvc.user$.subscribe((test) => {
      this.isLoggedIn = !!test;
    });
  }

  logout() {
    this.authSvc.logout();
  }
}
