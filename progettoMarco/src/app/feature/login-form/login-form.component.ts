import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { observable } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  handleError: HttpErrorResponse;
  loginForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  hide: boolean = false;
  errorMsg: string;
  user: [];
  @Input() loggedUser;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  onLogin() {
    this.auth.loginUser(this.email.value, this.password.value).subscribe(
      (data) => {
        this.auth.setLoggedUser(data);
        this.router.navigateByUrl('/home');
      },
      (error) => {
        const err = error.status;
        if (err === 500) {
          const message1: string = error.headers.get('ErrorMessage');
          this.openSnackBar('' + message1, 'ERRORE!');
        }
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
