import { Injectable } from "@angular/core";
import { Product, TradeMark } from "../../models/productModel/product.model";
import { Console } from "console";

@Injectable({providedIn : 'root'})
export class ProductService{
   private ListProduct: Product[] = [
  // --- NHÓM KEM QUE ---
  { id: 1, name: 'Kem que Socola', price: 10000, images: 'kemquesocola.png', category: 'Kem que', brand: 'Kem Tràng Tiền', sold: 10 },
  { id: 2, name: 'Kem que Đậu xanh', price: 10000, images: 'kemdauxanh-merino.png', category: 'Kem que', brand: 'Merino', sold: 50 },
  { id: 3, name: 'Kem que Sữa dừa', price: 12000, images: 'kemsuadua-trangtien.png', category: 'Kem que', brand: 'Vinamilk', sold: 100 },

  // --- NHÓM KEM HỘP ---
  { id: 4, name: 'Kem hộp Vanilla 450ml', price: 45000, images: 'kemhopvani-vinamilk.jpg', category: 'Kem hộp', brand: 'Vinamilk', sold: 500 },
  { id: 5, name: 'Kem hộp Socola 450ml', price: 45000, images: 'kemhopsocola-merino.jpg', category: 'Kem hộp', brand: 'Merino', sold: 1200 },

  // --- NHÓM KEM ỐC QUẾ ---
  { id: 6, name: 'Kem ốc quế dâu', price: 15000, images: 'ocquedau-merino.png', category: 'Kem ốc quế', brand: 'Merino', sold: 300 },
  { id: 7, name: 'Kem ốc quế Matcha', price: 15000, images: 'kemmatcha.png', category: 'Kem ốc quế', brand: 'Merino', sold: 200 },

  // --- NHÓM SỮA CHUA LỌ ---
  { id: 8, name: 'Sữa chua lọ truyền thống', price: 12000, images: 'yogurtt.png', category: 'Sữa chua lọ', brand: 'Khac', sold: 110 },
  { id: 9, name: 'Sữa chua lọ nha đam', price: 13000, images: 'suachuanhadam-vinamilk.png', category: 'Sữa chua lọ', brand: 'Vinamilk', sold: 135 },

  // --- NHÓM SỮA CHUA UỐNG ---
  { id: 10, name: 'Sữa chua uống Yakult', price: 11000, images: 'yakult.png', category: 'Sữa chua uống', brand: 'Vinamilk', sold: 69 },
  { id: 11, name: 'Sữa chua uống Probi', price: 12000, images: 'suachuauongprobi-vinamilk.png', category: 'Sữa chua uống', brand: 'Vinamilk', sold: 72 },

  // --- CÁC MỤC KHÁC (BỔ SUNG CHO ĐỦ LƯỚI 12 Ô) ---
  { id: 12, name: 'Kem tươi Việt Quất', price: 12000, images: 'kemtuoivq.png', category: 'Kem tươi', brand: 'Khac', sold: 10 },
  { id: 13, name: 'Kem xoài', price: 11000, images: 'kemxoai.png', category: 'Kem que', brand: 'Khac', sold: 90 },
  { id: 14, name: 'Kem Tràng Tiền Cốm', price: 10000, images: 'kemtrangtiencom.png', category: 'Kem que', brand: 'Trangtien', sold: 400 },
  { id: 15, name: 'Kem ốc quế Sầu riêng', price: 15000, images: 'kemsaurieng-merino.png', category: 'Kem ốc quế', brand: 'Merino', sold : 126 }
];
private trademark : TradeMark[] =[
    {name: "Vinamilk",image: "Vinamilk_logo.jpg"},
    {name: "Merino",image: "merino.jpg"},
    {name: "Tràng tiền", image: "kemtrangtien.png"},
]
    getProduct() :Product[]{
        return this.ListProduct;
    }
    getSearch(a : string): Product[]{
        const listS :Product[] = this.ListProduct.filter(p => p.name.toUpperCase().includes(a.toUpperCase()))
        if(listS.length === 0){
            console.log("Không có sản phẩm ");
        }
        return listS;
    }
    getDetail(current : number){
        const listId = this.ListProduct.find(p => p.id === current)
        return listId;
    }
    getIndex(): number{
        return this.ListProduct.length
    }
    getSold(): Product[]{
        return [...this.ListProduct].sort((a,b) => b.sold -a.sold).slice(0,10);
    }
    getTrade() : TradeMark[]{
        return this.trademark;
    }
}