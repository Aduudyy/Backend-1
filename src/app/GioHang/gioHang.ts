import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Product } from '../models/productModel/product.model';
import { NgIf } from '@angular/common';
import { NgModel, FormsModule } from '@angular/forms';




@Component({
  selector: 'app-GioHang',
  standalone: true,
  imports: [RouterOutlet,NgIf,FormsModule],
  templateUrl: './gioHang.html',
  styleUrl: './gioHang.css'
})
export class GioHangComponent  {
  cartItems = [
    {
      id: 1,
      name: 'Kem Ốc Quế Việt Quất',
      price: 45000,
      quantity: 2,
      image: 'assets/images/vietquat.png'
    },
    {
      id: 2,
      name: 'Kem Trái Dừa Đặc Biệt',
      price: 65000,
      quantity: 1,
      image: 'assets/images/dua.png'
    }
  ];

  ngOnInit() {}

  // Tăng số lượng
  increaseQty(item: any) {
    item.quantity++;
  }

  // Giảm số lượng
  decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  // Xóa sản phẩm
  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  // Tính tổng tiền hàng
  getSubtotal() {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Phí vận chuyển (giả định)
  getShipping() {
    return this.getSubtotal() > 200000 ? 0 : 15000;
  }
}
