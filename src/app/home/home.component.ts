import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  code;
  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private authService: AuthService
  ) {
    if (!this.tokenService.getToken()) {
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.code = params.code;
      });
    }
  }

  ngOnInit(): void {
    if (this.code) {
      this.authService.getAccessToken(this.code).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
