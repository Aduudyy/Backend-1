<<<<<<< HEAD
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { CommonModule } from "@angular/common";
import { OrderService } from '../service/orderService/OrderService.service';
=======
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { CommonModule } from "@angular/common";
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2

@Component({
  selector: 'app-my-order',
  imports: [CommonModule],
  templateUrl: './my-order.html',
  styleUrl: './my-order.css',
})
export class MyOrder implements OnInit {
  private cdr = inject(ChangeDetectorRef)
  orders: any[] = [];
<<<<<<< HEAD
  orderService = inject(OrderService)  
  ngOnInit(): void {
    this.loadOrder()
   
=======
  constructor(private storage: LocalStorageService) {}
  ngOnInit(): void {
    this.orders = this.storage.retrieve('donHang') || [];
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
  }
  loadOrder(){
    this.orderService.getAll().subscribe({
      next : (res) => {
        this.orders = res;
        this.cdr.detectChanges()
        console.log(res)
      }
    })

<<<<<<< HEAD
  }
  
=======
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
    this.storage.store('donHang', history);
    
    this.storage.clear('checkout'); 
  }
}
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
}