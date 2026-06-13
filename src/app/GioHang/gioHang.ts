import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { CartService } from '../service/CartItem/CartService.service';
import { CommonModule, NgForOf } from "@angular/common";
import { Cart, CartItem } from '../models/ShoppingModel/CartModel.model';
import { Router, RouterLink } from '@angular/router';
import { CheckoutService } from '../service/CheckOut/checkout.service';
=======
import { ShopService } from '../service/shoppingService/shopping.service';
import { Shopping } from '../models/ShoppingModel/shopping.model';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { NgIf } from "@angular/common";
import { LocalStorageService } from 'ngx-webstorage';
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2

@Component({
  selector: 'app-GioHang',
  standalone: true,
<<<<<<< HEAD
  imports: [FormsModule, NgForOf, CommonModule, RouterLink],
=======
  imports: [FormsModule, RouterLink,RouterModule],
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
  templateUrl: './gioHang.html',
  styleUrl: './gioHang.css'
})
export class GioHangComponent implements OnInit {
  constructor(private cdr : ChangeDetectorRef){}
  cartService = inject(CartService)
  router = inject(Router)
  cart: Cart | null = null;
  selectedCount = 0;
  isAllSelected = false;
  subTotal = 0;
  shippingFee = 0;
  finalTotal = 0;
  checkoutService = inject(CheckoutService)

  get cartItems(): CartItem[] {
    return this.cart?.cartItems || [];
  }
  ngOnInit() {
    this.loadCart()
    console.log('GioHangComponent Init');
  }
  loadCart(){
    this.cartService.getAllCart().subscribe({
      next: (res: Cart[]) => {
          this.cart = res[0]; 
          if (this.cart && this.cart.cartItems) {
          this.cart.cartItems.forEach(item => {
          item.selected = false; 
        });
      }
      this.cdr.detectChanges()
      this.updateTotal();
      },
      error: (err) => {
        console.error('Lỗi khi load giỏ hàng:', err);
      }
    });
  }

  

  updateTotal() {
    const selectedItems = this.cartItems.filter(item => item.selected);
    this.selectedCount = selectedItems.length;
    this.subTotal = selectedItems.reduce(
      (sum, item) => sum + (item.product?.sellPrice || 0) * item.quantity, // 
      0
    );
 
    this.finalTotal = this.subTotal ;
    this.isAllSelected = this.cartItems.length > 0 && 
                         this.cartItems.every(item => item.selected);
  }
  onItemSelectChange() {
    this.updateTotal();
  }

  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.isAllSelected = checked;
    
    // Gạt toàn bộ trạng thái checkbox mảng cục bộ ở FE
    this.cartItems.forEach(item => item.selected = checked);

    this.updateTotal();
  }

  // ===== XÓA SẢN PHẨM KHỎI GIỎ =====
  removeItem(cartItemId: number) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      this.cartService.deleteCartItem(cartItemId).subscribe({
        next: () => {
          // Xóa trên giao diện sau khi API xóa DB thành công
          if (this.cart && this.cart.cartItems) {
            this.cart.cartItems = this.cart.cartItems.filter(item => item.cartItemId !== cartItemId);
          }
          this.updateTotal();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Lỗi khi xóa sản phẩm', err)
        }
          
      });
    }
  }

  // ===== FORMAT TIỀN TỆ =====
  fomatPrice(price: number): string {
    return price ? price.toLocaleString('vi-VN') : '0';
  }

  // ===== CHUYỂN SANG TRANG ĐẶT HÀNG =====
  goCheckOut() {
    if (this.selectedCount === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
      return;
    }
    const selectedProducts = this.cartItems.filter(x => x.selected);
    this.checkoutService.setItems(selectedProducts);
    console.log(this.checkoutService.getItems())
    this.router.navigate(['/dathang']);
  }
  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.updateTotal();
  } 
  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotal();
    }
  }
<<<<<<< HEAD
=======
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

>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
}
