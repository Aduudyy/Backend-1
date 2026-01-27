import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { FormControl, FormsModule, NgModel, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../service/productService/product.service';
import { NgFor } from "@angular/common";
import { Product, TradeMark } from '../models/productModel/product.model';




@Component({
  selector: 'app-Home',
  standalone: true,
  imports: [ FormsModule, RouterLink, RouterModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit  {
  products : any[] = [];
  sellProduct : Product[] = [];
  tradeMarks : TradeMark[] =[];
  searching = new FormControl('');
  listProduct = inject(ProductService)
  private ngZone= inject(NgZone)
  currentIndex :number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 15;
  private chg = inject(ChangeDetectorRef)
  ngOnInit(): void {
    this.products = this.listProduct.getProduct()
    this.sellProduct = this.listProduct.getSold()
    this.tradeMarks =  this.listProduct.getTrade()
    this.slideBar()
  }
  // Tien Viet
  fomatPrice( price:number):string{
    return price.toLocaleString('vi-VN')
  }
  // sidebar
    hinhAnh = [
      'assets/images/background1.png',
      'assets/images/image_background.png',
    ]
    slideBar() {
      this.ngZone.run(()=>{
           setInterval(()=>{
            this.currentIndex=(this.currentIndex+1)% this.hinhAnh.length;
            this.chg.detectChanges();    
      },3000)
      }); 
    }
    // Các biến điều hướng
 // Số sản phẩm trên mỗi trang

// Hàm lấy danh sách sản phẩm sau khi phân trang

}
