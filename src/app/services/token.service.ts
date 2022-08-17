import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  ACCESS_TOKEN = 'access_token';
  USER_NAME = 'user_name';
  USER_URL = 'user_url';
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

  getUserName(): string {
    return localStorage.getItem(this.USER_NAME);
  }

  saveUserName(userName): void {
    localStorage.setItem(this.USER_NAME, userName);
  }

  removeUserName(): void {
    localStorage.removeItem(this.USER_NAME);
  }

  getUserURL(): string {
    return localStorage.getItem(this.USER_URL);
  }

  saveUserURL(userURL): void {
    localStorage.setItem(this.USER_URL, userURL);
  }

  removeUserURL(): void {
    localStorage.removeItem(this.USER_URL);
  }
}
