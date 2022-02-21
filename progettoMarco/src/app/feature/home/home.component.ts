import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { TokenService } from '../../core/service/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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

  getFakeList() {
    return this.authService.getFake().subscribe((oserver: any) => {
      console.log('x');
    });
  }
}
