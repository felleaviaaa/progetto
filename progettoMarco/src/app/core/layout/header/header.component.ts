import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../service/token.service';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() inputSideNav: MatSidenav;
  constructor(
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}
  name: string;
  storedUser: any;

  decodedToken: any;
  private helper = new JwtHelperService();

  ngOnInit(): void {
    this.retrieve();
  }

  retrieve() {
    console.log('inside localstorage');
    this.tokenService.getInfoObs().subscribe((res) => {
      this.storedUser = res;
      this.decodedToken = this.helper.decodeToken(this.storedUser.token);
    });
    console.log('storedUser:', this.storedUser);
  }

  checkuser() {}
}
