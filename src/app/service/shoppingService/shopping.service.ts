import { Injectable } from "@angular/core";
import { Shopping } from "../../models/ShoppingModel/shopping.model";
import { LocalStorageService } from "ngx-webstorage";

@Injectable({providedIn : 'root'})
export class ShopService {
    private readonly CART_KEY = 'cart_data';
    listShop: Shopping[] = [];
    cartItems: Shopping[] = [];

    constructor(private storage: LocalStorageService) {
        this.listShop = this.storage.retrieve(this.CART_KEY) || [];
    }
    getIndex(): number {
        return this.listShop.length;
  }

    // 2. Hàm thêm sản phẩm (có kiểm tra trùng)
    addToCart(product: Shopping): void {
        const item = this.listShop.find(p => p.id === product.id);
        if (!item) {
            this.listShop.push({ ...product, quanity: 1 });
        }
        this.saveCart();
    }
    removeProduct(productId: number): void {
        this.listShop = this.listShop.filter(p => p.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId: number, amount: number): void {
        const item = this.listShop.find(p => p.id === productId);
        if (item) {
            item.quanity += amount;
            if (item.quanity <= 0) {
                this.removeProduct(productId);
            }
        }
        this.saveCart();
    }

    // Hàm phụ để đồng bộ dữ liệu với LocalStorage
    private saveCart(): void {
        this.storage.store(this.CART_KEY, this.listShop);
    }

    // Lấy toàn bộ danh sách để hiển thị ở trang Giỏ hàng
    getCart(): Shopping[] {
        return this.listShop;
    }
    get subTotal(): number {
        return this.cartItems.reduce((sum, item) => sum + (item.price * item.quanity), 0);
    }

    get shippingFee(): number {
        return this.subTotal >= 200000 ? 0 : 20000;
    }
    get finalTotal(): number {
    return this.subTotal + this.shippingFee;
  }
  clearCart() {
    localStorage.removeItem(this.CART_KEY);
  }
}