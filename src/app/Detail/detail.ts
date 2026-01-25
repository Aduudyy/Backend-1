import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Product } from '../models/productModel/product.model';
import { NgIf } from '@angular/common';
import { NgModel, FormsModule } from '@angular/forms';
import { ProductService } from '../service/productService/product.service';
import { ShopService } from '../service/shoppingService/shopping.service';




@Component({
  selector: 'app-Home',
  standalone: true,
  imports: [RouterOutlet,NgIf,FormsModule],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class DetailComponent implements OnInit {
  prod : any;
  quanity : number = 1
  products = inject(ProductService)
  private route = inject(ActivatedRoute);
  shopping = inject(ShopService)
  currentId : number = Number(this.route.snapshot.paramMap.get('id'));
  ngOnInit(): void {
    this.prod = this.products.getDetail(this.currentId)
  }
  
  thanhTien(): string{  
    this.prod = this.products.getDetail(this.currentId)
    const price: number = this.prod.price
    var discount: number = 0 ;
    if(this.quanity >=10){
          discount = 10;
    }
    const totalPrice = price * this.quanity 
    return totalPrice.toLocaleString('vi-VN')
  }
  eventInput(): number{
    if(this.quanity < 1 ){
      return this.quanity = 1
    }
    return this.quanity
  }
  fomatPrice( price:number):string{
    return price.toLocaleString('vi-VN')
  }
  increaseQuanity(){
    this.quanity+=1
  }
  reduceQuanity(){
    if(this.quanity >1){
      this.quanity-=1;
    }else{
      this.quanity =1;
    }
  }
  addProduct(){
        this.shopping.addToCart(this.prod);
        
        console.log(this.shopping.listShop)
    }
  isLiked: boolean = false; // Lưu ý bạn đang viết là 'quanity' nên tôi giữ nguyên theo HTML của bạn

toggleLike() {
  this.isLiked = !this.isLiked;
}

// Giả lập hàm chuyển ảnh (nếu bạn có mảng ảnh)
prevImage() { console.log('Ảnh trước'); }
nextImage() { console.log('Ảnh sau'); }


reviews : any[] = [
    {
      author: 'Nguyễn Thị A',
      rating: 5,
      date: '22/01/2026',
      content: 'Kem giao đến vẫn còn rất cứng, đóng gói chắc chắn. Vị béo ngậy rất vừa miệng!',
      avatar: 'https://i.pravatar.cc/150?u=thao'
    },
    {
      author: 'Lê Minh Hoàng',
      rating: 4,
      date: '20/01/2026',
      content: 'Kem dâu ngon nhưng mình thấy hơi ngọt một chút. Sẽ thử lại vị socola sau.',
      avatar: 'https://i.pravatar.cc/150?u=hoang'
    },
    {
      author: 'Trần Thị Hồng',
      rating: 5,
      date: '15/01/2026',
      content: 'Chưa bao giờ thất vọng với kem của shop. 10 điểm cho chất lượng!',
      avatar: 'https://i.pravatar.cc/150?u=hong'
    }
  ];

  // Hàm tạo mảng sao dựa trên số rating
  getStars(rating: number) {
    return Array(rating).fill(0);
  }
}
