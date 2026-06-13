import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { CommonModule } from "@angular/common";
import { OrderService } from '../service/orderService/OrderService.service';

@Component({
  selector: 'app-my-order',
  imports: [CommonModule],
  templateUrl: './my-order.html',
  styleUrl: './my-order.css',
})
export class MyOrder implements OnInit {
  private cdr = inject(ChangeDetectorRef)
  orders: any[] = [];
  orderService = inject(OrderService)  
  ngOnInit(): void {
    this.loadOrder()
   
  }
  loadOrder(){
    this.orderService.getAll().subscribe({
      next : (res) => {
        this.orders = res;
        this.cdr.detectChanges()
        console.log(res)
      }
    })

  }
  
}