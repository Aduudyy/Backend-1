import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { FormControl, FormsModule, NgModel, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../service/productService/product.service';
import { NgFor } from "@angular/common";
import { Product, TradeMark } from '../models/productModel/product.model';
import { UserService } from '../service/userService/user.service';




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
  pService = inject(UserService)
  currentIndex :number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 15;
  private chg = inject(ChangeDetectorRef)
  ngOnInit(): void {
    window.scrollTo(0, 0);
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
      'assets/images/image_background.png',
      'assets/images/anh2.png',
      'assets/images/anh3.png',
    ]
    slideBar() {
      this.ngZone.run(()=>{
           setInterval(()=>{
            this.currentIndex=(this.currentIndex+1)% this.hinhAnh.length;
            this.chg.detectChanges();    
      },3000)
      }); 
    }
}
