import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  env;
  gitURL = 'https://github.com/login/oauth/';
  constructor(private http: HttpClient, private route: Router) {
    this.env = environment;
  }

  redirectToGit() {
    window.location.href =
      this.gitURL +
      'authorize?client_id=' +
      this.env.OAUTH_CLIENT +
      '&redirect_uri=' +
      this.env.REDIRECT_API_URL;
  }

  getAccessToken(code): Observable<any> {
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/json');
    return this.http.post(
      'http://127.0.0.1:8080/github.com/login/oauth/access_token?client_id=1c008509f10e15a34aaf&redirect_uri=http://localhost:4200/home&client_secret=36e1b0f9a7a7227784394dc1b4f8775069891c41&code=' +
        code,
      { headers: headers }
    );
  }

  getLoginUserDetails(token): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', 'token ' + token);
    return this.http.get('https://api.github.com/user', { headers: headers });
  }

  getLoginUserRepos(url): Observable<any> {
    return this.http.get(url);
  }

  getPublicRepos(userName) {
    return this.http.get('https://api.github.com/users/' + userName + '/repos');
  }
}
