import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/productService/product.service';
import { RouterLink } from "@angular/router";
import { NgForOf } from "@angular/common";
import { Product } from '../models/productModel/product.model';


@Component({
  selector: 'app-product',
  imports: [RouterLink, NgForOf],
  templateUrl: './product.html',
  styleUrl: './product.css',
})

export class Products implements OnInit{
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];

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
}
