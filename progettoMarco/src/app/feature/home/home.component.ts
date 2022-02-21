import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../core/service/auth.service";
import {TokenService} from "../../core/service/token.service";
import {User} from "../model/user";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private jwtHelper: JwtHelperService, private authService : AuthService, private tokenService : TokenService) {}
  name: string;
  storedUser: any;
  storedToken : any;
  decodedToken: any;


  ngOnInit(): void {
    this.retrieve();
    this.getToken();
  }

  retrieve() {
    console.log('inside localstorage');
   this.tokenService.getInfoObs().subscribe(
      res=>{
        this.storedUser = res
      }
    );
    console.log('storedUser:', this.storedUser.body);
}
  getToken(){
    const helper = new JwtHelperService();
    let codetoken = this.storedUser.body.token;
    this.decodedToken = helper.decodeToken(codetoken);
  console.log(this.decodedToken)
  }

  getFakeList() {
    return this.authService.getFake().subscribe((oserver : any)=>{
      console.log('x')
    });
  }
}
