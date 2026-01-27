import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/productService/product.service';
import { RouterLink } from "@angular/router";
import { Product } from '../models/productModel/product.model';


@Component({
  selector: 'app-product',
  imports: [RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})

export class Products implements OnInit{
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  products: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Nhận List trực tiếp
    this.allProducts = this.productService.getProduct();
    this.filteredProducts = [...this.allProducts];
  }

  // Lọc theo tên
  filterByName(searchName: string) {
    this.filteredProducts = this.allProducts.filter(p => 
      p.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }

  // Lọc theo tên thương hiệu
  filterByBrand(brandName: string) {
    this.filteredProducts = this.allProducts.filter(p => 
      p.brand === brandName
    );
  }

  resetFilter() {
    this.filteredProducts = [...this.allProducts];
  }
  fomatPrice( price:number):string{
    return price.toLocaleString('vi-VN')
  }
get paginatedProducts() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
}

// Hàm chuyển trang
changePage(page: number) {
  this.currentPage = page;
  window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
}

// Tính tổng số trang
get totalPages(): number {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
}
}
