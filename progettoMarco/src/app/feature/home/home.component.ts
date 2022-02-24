import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ItemsListService } from '../../core/service/items-list.service';
import { Subscription } from 'rxjs';
import { TokenService } from '../../core/service/token.service';

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
    private tokenService: TokenService
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

  ngOnDestroy(): void {
    this.getSubscription?.unsubscribe();
  }
}
