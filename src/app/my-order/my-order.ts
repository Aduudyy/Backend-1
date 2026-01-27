import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { CommonModule, NgClass } from "@angular/common";

@Component({
  selector: 'app-my-order',
  imports: [NgClass,CommonModule],
  templateUrl: './my-order.html',
  styleUrl: './my-order.css',
})
export class MyOrder implements OnInit {
  orders: any[] = [];

  constructor(private storage: LocalStorageService) {}

  ngOnInit(): void {
    // Lấy danh sách các đơn hàng đã mua
    this.orders = this.storage.retrieve('donHang') || [];
  }

  // Hàm tính tổng tiền của một đơn hàng cụ th

  // Xóa lịch sử đơn hàng
  clearHistory(orderCode: string) {
   let currentOrders = this.storage.retrieve('donHang') || [];

  // 2. Dùng filter để giữ lại những đơn KHÔNG TRÙNG với mã muốn xóa
  const updatedOrders = currentOrders.filter((item: any) => item.id !== orderCode);

  // 3. Lưu đè mảng mới (đã mất đi 1 món) vào Storage
  this.storage.store('donHang', updatedOrders);

  // 4. Cập nhật lại biến hiển thị trên giao diện để người dùng thấy nó biến mất ngay
  this.orders = updatedOrders;
  }
  confirmOrder() {
  const checkoutItems = this.storage.retrieve('checkout') || [];
  
  if (checkoutItems.length > 0) {
    let history = this.storage.retrieve('donHang') || [];

    const newOrder = {
      date: new Date(),
      items: checkoutItems,
      // Mặc định đơn hàng mới sẽ là 'Đang xử lý'
      status: 'Đang xử lý' 
    };

    history.unshift(newOrder); // Đưa đơn mới nhất lên đầu
    this.storage.store('donHang', history); // Ghi đè cập nhật
    
    this.storage.clear('checkout'); // Xóa sạch bộ nhớ tạm
    
  }
}
}