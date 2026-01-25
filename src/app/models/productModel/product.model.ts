
export interface Product{
   id: number,
   name: string,
   price: number,
   images: string,
   category: string, // Để phân loại: Kem que, Kem hộp, Kem ốc quế, Sữa chua lọ, Sữa chua uống
   brand: string,
   sold: number,
}
export interface TradeMark{
   name : string,
   image:string,
}
