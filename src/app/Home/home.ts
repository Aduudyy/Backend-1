import {  Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../service/productService/product.service';
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
<<<<<<< HEAD
  currentIndex :number = 0;
=======
  private ngZone= inject(NgZone)
  pService = inject(UserService)
  currentIndex :number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 15;
  private chg = inject(ChangeDetectorRef)
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
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
<<<<<<< HEAD
      'assets/images/banner1.jpg',
      'assets/images/banner2.jpg',
      'assets/images/Banner3.jpg',
=======
      'assets/images/image_background.png',
      'assets/images/anh2.png',
      'assets/images/anh3.png',
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
    ]
    slideBar() {

  setInterval(() => {

    this.currentIndex =
      (this.currentIndex + 1) % this.hinhAnh.length;

  }, 3000);

}
}
