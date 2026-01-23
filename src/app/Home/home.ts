import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { FormControl, FormsModule, NgModel, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../service/productService/product.service';
import { NgFor } from "@angular/common";



@Component({
  selector: 'app-Home',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink, RouterModule, ReactiveFormsModule, NgFor],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit  {
  products : any[] = []
  searching = new FormControl('')
  listProduct = inject(ProductService)
  private ngZone= inject(NgZone)
  currentIndex :number = 0;
  private chg = inject(ChangeDetectorRef)
  ngOnInit(): void {
    this.products = this.listProduct.getProduct()
    this.slideBar()
  }
  search(){
    const sear =this.searching.value
    if(!sear){
      console.log("Không Tìm Thấy");
      this.products = this.listProduct.getProduct()
    }else{
      this.products = this.listProduct.getSearch(sear)
      console.log("Tìm Thấy", this.listProduct.getSearch(sear));
    }
    
  }
  fomatPrice( price:number):string{
    return price.toLocaleString('vi-VN')
  }
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
}
