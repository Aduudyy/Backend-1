import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServices } from '../service/productService/productService.service';
import { CartService } from '../service/CartItem/CartService.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";




@Component({
  selector: 'app-Home',
  standalone: true,
  imports: [FormsModule, CommonModule, Toast],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class DetailComponent implements OnInit {
  prod : any;
  quanity : number = 1
  products = inject(ProductServices)
  carts = inject(CartService)
  private route = inject(ActivatedRoute);
  checkOut : any[] = []
  router = inject(Router)
  currentId : number = Number(this.route.snapshot.paramMap.get('id'));
  messageService = inject(MessageService)
  recommendProducts: any[] = [];
  constructor(private cdr : ChangeDetectorRef){}
  ngOnInit(): void {
   this.products.getProductById(this.currentId).subscribe({
    next: (data) => {
      this.prod = data;
      this.cdr.detectChanges()
      this.loadRecommend();
    },
    error: (err) => {
      console.error(err);
    }
  });
  }
  
  
 thanhTien(): string {
    if (!this.prod) return '0';
    const price: number = this.prod.sellPrice;
    const totalPrice = price * this.quanity;
    return totalPrice.toLocaleString('vi-VN');
  }
  eventInput(): number{
    if(this.quanity < 1 ){
      return this.quanity = 1
    }
    return this.quanity
  }

  fomatPrice( price:number):string{
    return price.toLocaleString('vi-VN')
  }

  increaseQuanity(){
    this.quanity+=1
  }

  reduceQuanity(){
    if(this.quanity >1){
      this.quanity-=1;
    }else{
      this.quanity =1;
    }
  }
  addProduct(productId: number) {
    const token = localStorage.getItem('token');
    console.log("token la : ",token);
    if (!token) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Thông báo',
        detail: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng'
      });

      setTimeout(() => {
        this.router.navigate(['/LoginMain']);
      }, 1000);

      return;
    }
    const item = {
      productId: productId,
      quantity: 1
    };

    this.carts.addCart(item ).subscribe({
      next: (res) => {
        console.log('Thêm thành công');
        this.loadCart();
        window.location.reload() // reload lại giỏ nếu cần
      },
      error: (err) => {
        console.log('Lỗi thêm giỏ hàng', err);
      }
    });
  }
  cartItems: any[] = [];
loadCart() {
  this.carts.getAllCart().subscribe({
    next: (res) => {
      this.cartItems = res;
     
    }
  });
  }
  loadRecommend() {
    if (!this.prod) return;

    this.products.getRecommend(
      this.prod.productId,
      this.prod.productName,
      this.prod.supplierId
    ).subscribe({
      next: (res) => {
        this.recommendProducts = res || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Lỗi recommend', err);
      }
    });
  }
}


 
 




