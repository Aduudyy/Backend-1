import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { InvoiceService } from '../service/InvoiceService/InvoiceService.Service';
import { CheckoutService } from '../service/CheckOut/checkout.service';
import { AuthService } from '../service/authService/authService.Service';
import { SupplierService } from '../service/productService/supplierService.service';
import { MessageService } from 'primeng/api';
import { OrderService } from '../service/orderService/OrderService.service';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, Toast],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {
  checkoutService = inject(CheckoutService)
  constructor(private cdr : ChangeDetectorRef, private user : AuthService){}
  private daichi = inject(SupplierService)
  private router = inject(Router);
<<<<<<< HEAD
  invoiceService = inject(InvoiceService)
  messageService = inject(MessageService)
  orderService = inject(OrderService)
  cartItems: any[] = [];
  profile : any = {}
=======
  private user = inject(UserService)
  cartItems: Shopping[] = [];
  private storage = inject(LocalStorageService);
  selectedAddress: any = null;
  wards: string[] = [];
  showAddressPopup = false;
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
  customer = {
    name: '',
    phone: '',
    address: '',
    note: ''
  };
<<<<<<< HEAD
  province : any[] =[]
  wards : any[] =[]
  selectedWard: any = null;
  note: string = '';
  private storage = inject(LocalStorageService);
  ngOnInit(): void {
    this.loadCheckout()
    this.loadUser()
    this.loadAddress()
  }
  loadUser(){
    this.user.getUser().subscribe({
      next: (res) => {
          this.profile = res;
          this.customer.name = res.fullName;
          this.customer.phone = res.numberPhone;
           this.cdr.detectChanges()
      }
    })
  }
  loadCheckout(){
     this.cartItems = this.checkoutService.getItems();
     console.log(this.cartItems)
     this.cdr.detectChanges()
  }
  loadAddress(){
    this.daichi.getWardByProvince(2).subscribe({
      next : (res) =>{
        this.wards = res;
         this.cdr.detectChanges()
        console.log(res);
      }
    })
  }
  saveOrder(){
    
  }

  get subTotal(): number {
  return this.cartItems.reduce(
    (total, item) =>
      total + (item.product?.sellPrice ?? 0) * item.quantity,
    0
  );
}
=======
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
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2

  get shippingFee(): number {
    return this.subTotal >= 200000 ? 0 : 20000;
  }

  get total(): number {
    return this.subTotal + this.shippingFee;
  }
  placeOrder() {
<<<<<<< HEAD
      if (this.cartItems.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Thông báo',
        detail: 'Giỏ hàng đang trống'
      });
      return;
    }
    console.log(this.selectedWard);
  console.log(this.selectedWard?.wardName);

    const payload = {
      province: 'Thái Nguyên',
      ward: this.selectedWard?.wardName,
      note: this.note,

      products: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };
      console.log(JSON.stringify(payload, null, 2));

      this.orderService.createOrder(payload)
        .subscribe({
          next: (res) => {

            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Đặt hàng thành công'
            });

            this.cartItems = [];
            this.checkoutService.clear() 
            setTimeout(() =>this.router.navigate(['Home']) ,1500)
          
          },
          error: (err) => {
            console.error(err);
            console.log('Status:', err.status);
            console.log('Error:', err.error);
            console.log('Full Error:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Lỗi',
              detail: err.error || 'Đặt hàng thất bại'
            });
          }
        });
=======
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

>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
  }
  returnGioHang(){
    this.storage.clear('checkout')
      this.router.navigate(['/Shopping-Bag'])

    }
}
