import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  name: string;
  storedUser: any;

  ngOnInit(): void {
    this.retrieve();
  }

  retrieve() {
    console.log('inside localstorage');
    this.storedUser = JSON.parse(localStorage.getItem('loggedUser') as string);
    console.log('storedUser:', this.storedUser.body);
  }
}
