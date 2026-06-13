import { Products } from "../productModel/Products.model";

export interface CartItem{
    cartItemId: number;
  quantity: number;
  productId: number;
  product?: Products;
  selected?: boolean;
}
export interface Cart {
  cartId: number;
  userId: number;
  cartItems: CartItem[]; // Nhận từ .Include(x => x.CartItems)
}