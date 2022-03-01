import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopItem } from '../../feature/model/shopItem';

@Injectable({
  providedIn: 'root',
})
export class ItemsListService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ShopItem[]> {
    return this.http.get<ShopItem[]>(
      'https://fakestoreapi.com/products?limit=5'
    );
  }
  submitItem(item: ShopItem[]): Observable<ShopItem> {
    return this.http.post<ShopItem>('http://localhost:3001/itemCart', item);
  }
}
