import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../service/shoppingService/shopping.service';
import { Shopping } from '../models/ShoppingModel/shopping.model';

@Component({
  selector: 'app-GioHang',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './gioHang.html',
  styleUrl: './gioHang.css'
})
export class GioHangComponent implements OnInit {

  private shopService = inject(ShopService);

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

    // Freeship >= 200k
    this.shippingFee =
      this.subTotal >= 200000 || this.subTotal === 0 ? 0 : 20000;

    this.finalTotal = this.subTotal + this.shippingFee;

    // Kiểm tra chọn tất cả
    this.isAllSelected =
      this.cartItems.length > 0 &&
      this.cartItems.every(item => item.selected);
  }

  // ===== CHECKBOX =====
  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.cartItems.forEach(item => item.selected = checked);
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
}
