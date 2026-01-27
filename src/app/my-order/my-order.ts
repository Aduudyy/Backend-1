import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-my-order',
  imports: [CommonModule],
  templateUrl: './my-order.html',
  styleUrl: './my-order.css',
})
export class MyOrder implements OnInit {
  orders: any[] = [];

  constructor(private storage: LocalStorageService) {}

  ngOnInit(): void {
    this.orders = this.storage.retrieve('donHang') || [];
  }

  clearHistory(orderCode: string) {
   let currentOrders = this.storage.retrieve('donHang') || [];
  const updatedOrders = currentOrders.filter((item: any) => item.id !== orderCode);
  this.storage.store('donHang', updatedOrders);
  this.orders = updatedOrders;
  }
  confirmOrder() {
  const checkoutItems = this.storage.retrieve('checkout') || [];
  const statuses = ['Đang xử lý', 'Đã xác nhận', 'Đang giao hàng', 'Đã hoàn thành', 'Đã hủy'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  if (checkoutItems.length > 0) {
    let history = this.storage.retrieve('donHang') || [];


    const newOrder = {
      date: new Date(),
      items: checkoutItems,
      status: randomStatus ,
    };

    history.unshift(newOrder); // Đưa đơn mới nhất lên đầu
    this.storage.store('donHang', history); // Ghi đè cập nhật
    
    this.storage.clear('checkout'); // Xóa sạch bộ nhớ tạm
    
  }
}
}