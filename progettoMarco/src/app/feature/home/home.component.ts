import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemsListService } from '../../core/service/items-list.service';
import { Subscription } from 'rxjs';
import { TokenService } from '../../core/service/token.service';
import { CartService } from '../../core/service/cart.service';
import { ShopItem } from '../model/shopItem';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  getSubscription: Subscription;
  itemList: any[];

  constructor(
    private itemService: ItemsListService,
    private cartService: CartService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getItemList();
  }

  getItemList() {
    this.getSubscription = this.itemService.getAll().subscribe(
      (observer) => {
        this.itemList = observer;
        console.log(this.itemList);
      },
      (error) => {
        console.log(error);
      },
      () => {}
    );
  }
}
