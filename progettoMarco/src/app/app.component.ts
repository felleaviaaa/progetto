import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenService } from './core/service/token.service';
import { ItemCategoryService } from './core/service/item-category.service';
import { Observable, Subscription } from 'rxjs';
import { User } from './feature/model/user';
import { LoginFormComponent } from './feature/login-form/login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'progettoMarco';
  hide = true;
  status: boolean;
  item: any[] = [];
  getItemSub: Subscription;
  isLoggedIn$: Observable<User>;

  constructor(
    private tokenService: TokenService,
    private itemCategory: ItemCategoryService
  ) {}

  ngOnInit(): void {
    this.getItemSub = this.itemCat();
    console.log(this.status);
    this.check();
    // this.status = this.tokenService.checkLoggedStatus();
  }

  itemCat() {
    return this.itemCategory.getAll().subscribe(
      (obs: any[]) => {
        console.log(obs);
        this.item = [...obs];
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('complete');
      }
    );
  }
  check() {
    this.isLoggedIn$ = this.tokenService.getInfoObs();
  }
  /* setActivated(ev) {
    if (!(ev instanceof LoginFormComponent)) {
      return;
    }
    const child: LoginFormComponent = ev;
    child.setActiveItem.subscribe(() => {
      this.status = true;
    });
  }*/
}
