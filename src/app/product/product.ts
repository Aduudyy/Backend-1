<<<<<<< HEAD
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { RouterLink, Router } from "@angular/router";
import { CommonModule, NgForOf } from "@angular/common";
import { ProductServices } from '../service/productService/productService.service';
import { MessageService } from 'primeng/api';
import { Products } from '../models/productModel/Products.model';
import { SupplierService } from '../service/productService/supplierService.service';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { Toast } from "primeng/toast";
import { CategoryService } from '../service/Category/category.service';

=======
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/productService/product.service';
import { RouterLink } from "@angular/router";
import { Product } from '../models/productModel/product.model';
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2


@Component({
  selector: 'app-product',
<<<<<<< HEAD
  imports: [RouterLink, NgForOf, CommonModule, FormsModule, Toast],
=======
  imports: [RouterLink],
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
  templateUrl: './product.html',
  styleUrl: './product.css',
})

<<<<<<< HEAD
export class Product implements OnInit{
  constructor(private cdr: ChangeDetectorRef){}
  productService = inject(ProductServices)
  products : Products[] = []
  supplierService = inject(SupplierService)
  supplier : any[] = []
  private messageService = inject(MessageService)
  private router = inject(Router)
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  pageNumbers: number[] = [];
  isEditMode: boolean = false;
  paginatedProducts: Products[] = [];
  searchName: string = '';
  selectedSupplierId?: number;
  categoryService = inject(CategoryService)
  category : any[] = []
=======
export class Products implements OnInit{
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  products: any;

  constructor(private productService: ProductService) {}
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2

  ngOnInit() {
    this.loadProduct()
    this.loadCategory()
    this.loadSupplier()
  }

  loadProduct(){
     this.productService.getAll().subscribe({
      next: (data) => {
        this.products = [...data];
        console.log(data)
        this.setupPagination();
         this.changePage(1);
         this.cdr.detectChanges();
      },
      error: ()=>{
        this.messageService.add({
          severity:'error',
          detail: 'Không có sản phẩm'
        })
      }
    })
  }
  loadCategory(){
    this.categoryService.getAll().subscribe({
      next : (res) =>{
        this.category = res
        console.log(res)
      }
    })
  }
  loadSupplier(){
    this.supplierService.getAllSupplier().subscribe({
      next : (res)=>{
        this.supplier = res;
        this.cdr.detectChanges();
        console.log(res);
      },
      error : (err)=>{
          this.messageService.add({
                    severity:'error',
                    detail: 'Không có sản phẩm'
                  })
      }
    })
  }
  // Lọc theo tên
  searchProduct(){
    console.log('searchName =', this.searchName);
    this.selectedSupplierId = undefined;
    this.productService.getProductname(this.searchName, this.selectedSupplierId)
    .subscribe({
      next: (res) => {
        this.products = res;
        this.setupPagination()
        this.cdr.detectChanges()
        console.log(res);
      },
      error: (err) => {
        this.setupPagination()
         this.cdr.detectChanges()
      }
    });
  }
  filterBySupplier(id: number) {
    this.selectedSupplierId = id;
    this.productService
      .getProductname(this.searchName, this.selectedSupplierId).subscribe({
        next :  (res) => {
          this.products = res;
          this.setupPagination();
          this.cdr.detectChanges()
        },
        error : (err) => {
           this.products = [];
          this.setupPagination()
          this.cdr.detectChanges()
        }

    });
  }
  filterByName(name: string) {
    this.searchName = name; // Cập nhật tên cần tìm vào biến chung của component

    // Gọi API với cả 2 tham số: tên vừa nhập và ID thương hiệu hiện tại (nếu có)
    this.productService
      .getProductname(this.searchName)
      .subscribe({
        next: (res) => {
          this.products = res;
          this.setupPagination();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.products = [];
          this.setupPagination();
          this.cdr.detectChanges();
        }
      });
  }
  fomatPrice( price:number):string{
    return price.toLocaleString('vi-VN')
  }
<<<<<<< HEAD
  setupPagination() {
    this.totalPages = Math.ceil(
      this.products.length / this.pageSize
    );
    this.pageNumbers = Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
    if (this.totalPages > 0) {
      this.changePage(1);
    } else {
      this.paginatedProducts = [];
    }
  }

changePage(page: number) {
  if (!this.products?.length) return;

  this.currentPage = page;

  const startIndex = (page - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;

  this.paginatedProducts = this.products
    .slice(startIndex, endIndex)
    .filter(p => p?.productId != null);
}
 goToProducts(id: number | undefined) {
  if (id == null) {
    console.error('productId bị undefined:', id);
    return;
  }

  this.router.navigate(['/Detail', id]);
=======
get paginatedProducts() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
}

// Hàm chuyển trang
changePage(page: number) {
  this.currentPage = page;
  window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
}
get totalPages(): number {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
>>>>>>> 9610326f6179a0e89a810d969c71dfd32c92ede2
}
}
