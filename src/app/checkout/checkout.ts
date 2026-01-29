import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../service/shoppingService/shopping.service';
import { Shopping } from '../models/ShoppingModel/shopping.model';
import { Router } from '@angular/router';
import { UserService } from '../service/userService/user.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {
  private shopService = inject(ShopService);
  private router = inject(Router);
  private user = inject(UserService)
  cartItems: Shopping[] = [];
  private storage = inject(LocalStorageService);
  selectedAddress: any = null;
  wards: string[] = [];
  showAddressPopup = false;
  customer = {
    name: '',
    phone: '',
    address: '',
    note: ''
  };
  provinces = ['Thái Nguyên','HaNoi'];
  WardMap: any = {
  'Thái Nguyên': ['TP.Thái Nguyên', 'xã Quyết Thắng']
  };
  newAddress = {
    province: '',
    ward: '',
    detail: '',
    fullAddress: ''
  };

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.cartItems = this.storage.retrieve('checkout');
    const name = this.user.getProductss()
    this.customer.name = name[0].name
    this.customer.phone = name[0].sdt
    const savedAddress = this.storage.retrieve('address');
    if (savedAddress) {
      this.selectedAddress = savedAddress;
      this.customer.address = savedAddress.fullAddress;
    } 
  }

  get subTotal(): number {
    return (this.cartItems.reduce((sum, item) => 
      sum + item.price * item.quanity,0
    )?? 0);
  }

  get shippingFee(): number {
    return this.subTotal >= 200000 ? 0 : 20000;
  }

  get total(): number {
    return this.subTotal + this.shippingFee;
  }
  placeOrder() {
  if (this.cartItems.length === 0) {
    alert('Giỏ hàng trống');
    this.router.navigate(['/']);
    return;
  }
  if (!this.customer.name || !this.customer.phone || !this.customer.address) {
    alert('Vui lòng nhập đầy đủ thông tin nhận hàng');
    return;
  }
  const order = {
    customer: this.customer,
    items: this.cartItems,
    total: this.total,
    createdAt: new Date()
  };
  const donhang = this.storage.retrieve('checkout') || [];
  const listOrder = this.storage.retrieve('donHang') || [];
  const newItems = donhang.map((item: any, idx: number) => ({
    ...item,
    orderCode: 'ORD' + Date.now() + idx,
    status: 'Đang xử lý',
    date: new Date()
  }));
  const updatedList = [...newItems, ...listOrder];
  this.storage.store('donHang', updatedList); 
  this.storage.clear('checkout');
  alert('🎉 Đặt hàng thành công!');
  this.router.navigate(['/User/Home']);
}
/* ===== POPUP ===== */

openAddressPopup() {
  this.showAddressPopup = true;
}

closeAddressPopup() {
  this.showAddressPopup = false;
}

onProvinceChange() {
  this.wards = this.WardMap[this.newAddress.province] || [];
  this.newAddress.ward = '';
}

saveAddress() {
  if (
    !this.newAddress.province ||
    !this.newAddress.ward ||
    !this.newAddress.detail
  ) {
    alert('Vui lòng nhập đầy đủ địa chỉ');
    return;
  }

  const fullAddress =
    `${this.newAddress.detail}, ${this.newAddress.ward}, ` +
    `${this.newAddress.ward}, ${this.newAddress.province}`;

  this.selectedAddress = {
    ...this.newAddress,
    fullAddress
  };
  this.customer.address = fullAddress;
  this.storage.store('address', this.selectedAddress);
  this.closeAddressPopup();
}
returnGioHang(){
  this.storage.clear('checkout')
    this.router.navigate(['/User/Shopping-Bag'])

  }

}
