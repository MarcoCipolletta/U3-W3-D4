import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { iUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersUrl: string = environment.usersUrl;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<iUser[]>(this.usersUrl);
  }
}
