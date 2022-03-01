import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../service/token.service';
import { MatSidenav } from '@angular/material/sidenav';
import { CartComponent } from '../../../feature/cart/cart.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../service/cart.service';

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
    private tokenService: TokenService,
    private dialog: MatDialog,
    public carteService: CartService
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
  openCart() {
    const dialogRef = this.dialog.open(CartComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
