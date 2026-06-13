import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private selectedItems: any[] = [];
  setItems(items: any[]) {
    this.selectedItems = items;
  }
  getItems() {
    return this.selectedItems;
  }
  clear() {
    this.selectedItems = [];
  }
}