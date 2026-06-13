import {  Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../service/productService/product.service';
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
  currentIndex :number = 0;
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
      'assets/images/banner1.jpg',
      'assets/images/banner2.jpg',
      'assets/images/Banner3.jpg',
    ]
    slideBar() {

  setInterval(() => {

    this.currentIndex =
      (this.currentIndex + 1) % this.hinhAnh.length;

  }, 3000);

}
}
