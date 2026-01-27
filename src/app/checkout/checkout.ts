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

  // Thông tin khách hàng
  customer = {
    name: '',
    phone: '',
    address: '',
    note: ''
  };
  /* DỮ LIỆU MẪU – SAU NÀY CÓ THỂ GẮN API */
  provinces = ['Thái Nguyên'];

  districtMap: any = {
  'Thái Nguyên': ['TP.Thái Nguyên', 'xã Quyết']
  };

  wardMap: any = {
  'Cầu Giấy': ['Dịch Vọng', 'Nghĩa Tân'],
  'Đống Đa': ['Láng Hạ'],
  'Quận 1': ['Bến Nghé'],
  'Quận 7': ['Tân Phú']
  };

  districts: string[] = [];
  wards: string[] = [];
  showAddressPopup = false;
private storage = inject(LocalStorageService);
selectedAddress: any = null;

newAddress = {
  province: '',
  district: '',
  ward: '',
  detail: '',
  fullAddress: ''
};

  ngOnInit(): void {
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
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quanity,
      0
    );
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

  console.log('Đơn hàng:', order);

  
 const donhang = this.storage.retrieve('checkout') || [];
  const listOrder = this.storage.retrieve('donHang') || [];

  // Chuẩn bị các item mới kèm thông tin bổ sung
  const newItems = donhang.map((item: any, idx: number) => ({
    ...item, // Copy lại toàn bộ name, price, images...
    orderCode: 'ORD' + Date.now() + idx,
    status: 'Đang xử lý',
    date: new Date()
  }));

  // Gộp vào danh sách cũ (Lưu ý: dùng ... để phẳng hóa mảng)
  const updatedList = [...newItems, ...listOrder];

  // Lưu đè lại vào storage
  this.storage.store('donHang', updatedList); 
  
  this.storage.clear('checkout');
  alert('🎉 Đặt hàng thành công!');
  this.router.navigate(['/Home']);
}





/* ===== POPUP ===== */

openAddressPopup() {
  this.showAddressPopup = true;
}

closeAddressPopup() {
  this.showAddressPopup = false;
}

onProvinceChange() {
  this.districts = this.districtMap[this.newAddress.province] || [];
  this.newAddress.district = '';
  this.wards = [];
}

onDistrictChange() {
  this.wards = this.wardMap[this.newAddress.district] || [];
  this.newAddress.ward = '';
}

saveAddress() {
  if (
    !this.newAddress.province ||
    !this.newAddress.district ||
    // !this.newAddress.ward ||
    !this.newAddress.detail
  ) {
    alert('Vui lòng nhập đầy đủ địa chỉ');
    return;
  }

  const fullAddress =
    `${this.newAddress.detail}, ${this.newAddress.ward}, ` +
    `${this.newAddress.district}, ${this.newAddress.province}`;

  this.selectedAddress = {
    ...this.newAddress,
    fullAddress
  };

  // Gán vào customer
  this.customer.address = fullAddress;

  // ✅ LƯU BẰNG NGX-WEBSTORAGE
  this.storage.store('address', this.selectedAddress);

  this.closeAddressPopup();
}
returnGioHang(){
  this.storage.clear('checkout')
    this.router.navigate(['/Shopping-Bag'])

  }

}
