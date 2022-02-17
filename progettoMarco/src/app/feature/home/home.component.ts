import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private jwtHelper: JwtHelperService) {}
  name: string;
  storedUser: any;
  storedToken : any;


  ngOnInit(): void {
    this.retrieve();
    this.getToken();
    this.infoToken();
  }

  retrieve() {
    console.log('inside localstorage');
    this.storedUser = JSON.parse(localStorage.getItem('loggedUser') as string);
    console.log('storedUser:', this.storedUser.body);
  }

  getToken(){
    const helper = new JwtHelperService();
    let codetoken = this.storedUser.body.token;
    const decodedToken = helper.decodeToken(codetoken);
   localStorage.setItem('localStorageToken', JSON.stringify(decodedToken));
  }
  infoToken(){
    console.log('inside localstorage about token');
    this.storedToken = JSON.parse(localStorage.getItem('localStorageToken') as string);
    console.log('storedToken:', this.storedToken);
  }
}
