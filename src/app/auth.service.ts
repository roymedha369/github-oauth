import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enviornment } from './environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  env;
  gitURL = 'https://github.com/login/oauth/';
  constructor(private http: HttpClient, private route: Router) {
    this.env = new Enviornment();
  }

  redirectToGit() {
    window.location.href =
      this.gitURL +
      'authorize?client_id=' +
      this.env.OAUTH_CLIENT +
      '&redirect_uri=' +
      this.env.REDIRECT_API_URL;
  }

  getAccessToken(code) {
    let params = new HttpParams()
      .set('client_id', this.env.OAUTH_CLIENT)
      .set('redirect_uri', this.env.REDIRECT_API_URL)
      .set('client_secret', this.env.OAUTH_SECRET)
      .set('code', code);
    return this.http.post(this.gitURL + 'access_token', { params: params });
  }
}
