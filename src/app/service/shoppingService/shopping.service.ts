import { Injectable } from "@angular/core";
import { Shopping } from "../../models/ShoppingModel/shopping.model";
import { LocalStorageService } from "ngx-webstorage";

@Injectable({providedIn : 'root'})
export class ShopService {
    private readonly CART_KEY = 'cart_data';
    listShop: Shopping[] = [];
    cartItems: Shopping[] = [];

    constructor(private storage: LocalStorageService) {
        // Khởi tạo: Lấy dữ liệu cũ từ LocalStorage nếu có
        this.listShop = this.storage.retrieve(this.CART_KEY) || [];
    }

    // 1. Lấy số lượng loại mặt hàng trong giỏ
    getIndex(): number {
        return this.listShop.length;
  }

    // 2. Hàm thêm sản phẩm (có kiểm tra trùng)
    addToCart(product: Shopping): void {
        // Tìm xem sản phẩm đã có trong giỏ chưa
        const item = this.listShop.find(p => p.id === product.id);

        if (!item) {
            // Nếu chưa có thì thêm mới vào danh sách
            this.listShop.push({ ...product, quanity: 1 });
        }

        // Lưu lại vào LocalStorage
        this.saveCart();
    }

    // 3. Hàm xóa sản phẩm khỏi giỏ
    removeProduct(productId: number): void {
        this.listShop = this.listShop.filter(p => p.id !== productId);
        this.saveCart();
    }

    // 4. Hàm cập nhật số lượng (dùng cho nút + / -)
    updateQuantity(productId: number, amount: number): void {
        const item = this.listShop.find(p => p.id === productId);
        if (item) {
            item.quanity += amount;
            // Nếu số lượng về 0 thì xóa luôn khỏi giỏ
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

  // 2. Tính phí vận chuyển
    get shippingFee(): number {
    // Nếu tạm tính > 200.000đ thì free (0đ), ngược lại phí 20.000đ (ví dụ)
        return this.subTotal >= 200000 ? 0 : 20000;
    }

  // 3. Tổng thanh toán cuối cùng
    get finalTotal(): number {
    return this.subTotal + this.shippingFee;
  }
}