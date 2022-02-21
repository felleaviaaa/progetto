import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LoginFormComponent } from './feature/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OneInterceptor } from './core/service/interceptor/one.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { fakeBackendProvider } from "./core/service/interceptor/fake-backend";
import { JwtModule } from "@auth0/angular-jwt";
import {Authorization} from "./core/service/interceptor/authorization";

@NgModule({
  declarations: [AppComponent, LoginFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:  () => localStorage.getItem('access_token')
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OneInterceptor,
      multi: true,
    },
    fakeBackendProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Authorization,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
