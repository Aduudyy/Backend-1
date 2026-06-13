<<<<<<< HEAD
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServices } from '../service/productService/productService.service';
import { CartService } from '../service/CartItem/CartService.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
=======
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Product } from '../models/productModel/product.model';
import { NgIf } from '@angular/common';
import { NgModel, FormsModule } from '@angular/forms';
import { ProductService } from '../service/productService/product.service';
import { ShopService } from '../service/shoppingService/shopping.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { routes } from '../app.routes';
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2




@Component({
  selector: 'app-Home',
  standalone: true,
<<<<<<< HEAD
  imports: [FormsModule, CommonModule, Toast],
=======
  imports: [FormsModule],
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
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
<<<<<<< HEAD
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
=======
    this.prod = this.products.getDetail(this.currentId)
    window.scrollTo(0, 0);
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
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

<<<<<<< HEAD
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
=======
toggleLike() {
  this.isLiked = !this.isLiked;
}
btnBuy() {
  let currentCheckout: any[] = this.storage.retrieve('checkout') || [];
  const existingProduct = currentCheckout.find(item => item.id === this.prod.id);
  if (existingProduct) {
    existingProduct.quantity = (existingProduct.quanity || 1) + 1;
  } else {
    currentCheckout.push({ ...this.prod, quanity: this.quanity });
  }
  this.storage.store('checkout', currentCheckout);
  this.router.navigate(['/dathang']);
}
prevImage() { console.log('Ảnh trước'); }
nextImage() { console.log('Ảnh sau'); }


reviews : any[] = [
    {
      author: 'Nguyễn Thị A',
      rating: 5,
      date: '22/01/2026',
      content: 'Kem giao đến vẫn còn rất cứng, đóng gói chắc chắn. Vị béo ngậy rất vừa miệng!',
      avatar: 'https://i.pravatar.cc/150?u=thao'
    },
    {
      author: 'Lê Minh Hoàng',
      rating: 4,
      date: '20/01/2026',
      content: 'Kem dâu ngon nhưng mình thấy hơi ngọt một chút. Sẽ thử lại vị socola sau.',
      avatar: 'https://i.pravatar.cc/150?u=hoang'
    },
    {
      author: 'Trần Thị Hồng',
      rating: 5,
      date: '15/01/2026',
      content: 'Chưa bao giờ thất vọng với kem của shop. 10 điểm cho chất lượng!',
      avatar: 'https://i.pravatar.cc/150?u=hong'
    }
  ];
  
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
}


 
 




