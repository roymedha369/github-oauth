import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  ACCESS_TOKEN = 'access_token';
  constructor() {}

  getToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  saveToken(token): void {
    localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
  }
}
