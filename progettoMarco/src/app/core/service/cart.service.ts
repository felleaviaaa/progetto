import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShopItem } from '../../feature/model/shopItem';
import { BehaviorSubject, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}
  public itemList: any = [];
  public totalList = new BehaviorSubject<any>([]);

  add(product: any) {
    let numero = this.itemList.filter((x) => x.id === product.id);
    if (numero.length < 2) {
      this.itemList.push(product);
      this.totalList.next(this.itemList);
      this._snackBar.open('Aggiunto al carrello');
    } else {
      this._snackBar.open('Prodotto già aggiunto');
    }
  }

  getProducts() {
    return this.totalList.asObservable();
  }
  reset() {
    this.itemList = [];
    this.totalList.next(this.itemList);
  }
}
