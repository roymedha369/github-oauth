import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css'],
})
export class RepositoriesComponent implements OnInit {
  userName;
  repoList;
  sortedKeys;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken() && this.tokenService.getUserURL()) {
      return;
    } else {
      this.goToLogin();
    }
  }

  getPublicRepos() {
    this.authService.getPublicRepos(this.userName).subscribe(
      (data) => {
        this.repoList = data;
        this.repoList.sort((a, b) => {
          if (a.stargazers_count < b.stargazers_count) return 1;

          if (a.stargazers_count > b.stargazers_count) return -1;

          return 0;
        });
      },
      (error) => {
        if (error.message && error.error.message == 'Not Found') {
          alert('Enter correct username');
        } else {
          alert('Please try again!');
        }
        this.clearResult();
      }
    );
  }

  clearResult() {
    this.repoList = [];
    this.userName = '';
  }

  goToLogin() {
    this.route.navigate(['/login']);
  }
}
