import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../service/shoppingService/shopping.service';
import { Shopping } from '../models/ShoppingModel/shopping.model';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { NgIf } from "@angular/common";
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-GioHang',
  standalone: true,
  imports: [FormsModule, RouterLink,RouterModule],
  templateUrl: './gioHang.html',
  styleUrl: './gioHang.css'
})
export class GioHangComponent implements OnInit {

  private shopService = inject(ShopService);
  private router = inject(Router)
  private storage = inject(LocalStorageService)
  cartItems: Shopping[] = [];

  // ===== BIẾN PHỤC VỤ CHỌN MUA =====
  selectedCount = 0;
  isAllSelected = false;
  quanity : number =1;

  ngOnInit() {
    this.cartItems = this.shopService.getCart();
    // Mặc định khi load: chưa chọn sản phẩm nào
    this.cartItems.forEach(item => {
      if (item.selected === undefined) {
        item.selected = false;
      }
    });

    this.updateTotal();
  }

  // ===== TÍNH TOÁN =====
  subTotal = 0;
  shippingFee = 0;
  finalTotal = 0;

  updateTotal() {
  const selectedItems = this.cartItems.filter(item => item.selected);
  this.selectedCount = selectedItems.length;
  this.subTotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quanity,
    0
  );

  this.shippingFee = (this.subTotal >= 200000 || this.subTotal === 0) ? 0 : 20000;
  this.finalTotal = this.subTotal + this.shippingFee;
  this.isAllSelected = this.cartItems.length > 0 && 
                       this.cartItems.every(item => item.selected);
  this.storage.store('Checkout', selectedItems);
  this.storage.store('Cart', this.cartItems);
}

  // ===== CHECKBOX =====
  toggleSelectAll(event: any) {
  const checked = event.target.checked;
  this.isAllSelected = checked;
  this.cartItems.forEach(item => item.selected = checked);
  const selectedProducts = this.cartItems.filter(item => item.selected);
  if (checked) {
    this.storage.store('Checkout', selectedProducts);
  } else {
    this.storage.store('Checkout', []);
  }

  this.updateTotal();
  }

  // ===== TĂNG / GIẢM SỐ LƯỢNG =====
  increaseQty(item: Shopping) {
    this.shopService.updateQuantity(item.id, 1);
    this.quanity +=1;
    this.updateTotal();
  }

  decreaseQty(item: Shopping) {
    if (item.quanity > 1) {
      this.shopService.updateQuantity(item.id, -1);
      this.quanity-=1;
      this.updateTotal();
    }
  }
  fomatPrice( price:number):string{
    return price.toLocaleString('vi-VN')
  }

  // ===== XÓA SẢN PHẨM =====
  removeItem(id: number) {
    this.shopService.removeProduct(id);
    this.cartItems = this.shopService.getCart();
    this.updateTotal();
  }
  goCheckOut(){
    this.router.navigate(['/User/dathang'])
  }
  getSubtotal() {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quanity), 0);}
  getShipping() {
    return this.getSubtotal() > 200000 ? 0 : 15000;}

}
