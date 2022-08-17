import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  code;
  userName;
  repoList;
  showListFlag = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private authService: AuthService,
    private route: Router
  ) {
    if (!this.tokenService.getToken()) {
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.code = params.code;
      });
    }
  }

  ngOnInit(): void {
    if (this.tokenService.getToken() && this.tokenService.getUserURL()) {
      this.userName = this.tokenService.getUserName();
      this.getUserRepos();
    } else if (this.code) {
      this.authService.getAccessToken(this.code).subscribe(
        (res) => {
          if (res && res.access_token) {
            this.tokenService.saveToken(res.access_token);
            this.authService
              .getLoginUserDetails(this.tokenService.getToken())
              .subscribe(
                (data) => {
                  if (data && data.login) {
                    this.userName = data.login;
                    this.tokenService.saveUserName(this.userName);
                    this.tokenService.saveUserURL(data.repos_url);
                    this.getUserRepos();
                  }
                },
                (error) => {
                  this.showError('Unexpected Error Occured!');
                }
              );
          } else if (res && res.error) {
            this.showError('Session Expired!');
          }
        },
        (error) => {
          this.showError('Unexpected Error Occured!');
        }
      );
    } else {
      this.goToLogin();
    }
  }

  showError(message) {
    alert(message);
    this.goToLogin();
  }

  logOut() {
    this.tokenService.removeToken();
    this.tokenService.removeUserName();
    this.tokenService.removeUserURL();
    this.showListFlag = false;
    this.goToLogin();
  }

  getUserRepos() {
    this.authService
      .getLoginUserRepos(this.tokenService.getUserURL())
      .subscribe((data) => {
        this.repoList = data;
        this.showListFlag = true;
      });
  }

  goToLogin() {
    this.route.navigate(['/login']);
  }
}
