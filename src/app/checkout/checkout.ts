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
  invoiceService = inject(InvoiceService)
  messageService = inject(MessageService)
  orderService = inject(OrderService)
  cartItems: any[] = [];
  profile : any = {}
  customer = {
    name: '',
    phone: '',
    address: '',
    note: ''
  };
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

  get shippingFee(): number {
    return this.subTotal >= 200000 ? 0 : 20000;
  }

  get total(): number {
    return this.subTotal + this.shippingFee;
  }

  placeOrder() {
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
  }
  returnGioHang(){
    this.storage.clear('checkout')
      this.router.navigate(['/Shopping-Bag'])

    }
}
