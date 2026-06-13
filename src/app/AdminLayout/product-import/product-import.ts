import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupplierService } from '../../service/productService/supplierService.service';
import { MessageService } from 'primeng/api';
import { DecimalPipe, NgForOf } from "@angular/common";
import { NgSelectModule, NgPlaceholderTemplateDirective } from '@ng-select/ng-select';
import { ProductServices } from '../../service/productService/productService.service';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-product-import',
  imports: [ReactiveFormsModule, NgForOf, FormsModule, DecimalPipe, Toast],
  templateUrl: './product-import.html',
  styleUrl: './product-import.css',
})
export class ProductImport implements OnInit {
  constructor(private fb : FormBuilder,private cdr: ChangeDetectorRef){}
  supplierService = inject(SupplierService)
  productService = inject(ProductServices)
  data: any[] = []
  product: any[] = []
  formData : any
  messageService = inject(MessageService)
  supplierId : number | null = null
  selectedProducts: any[] = []
  totalPrice: number = 0;
  soluong : number = 0;

  ngOnInit(): void {
    this.loadSupplier()
    this.formData = this.fb.group({
      supplierId : ['',Validators.required],
    })
    
  }

  loadSupplier(){
    this.supplierService.getAllSupplier().subscribe({
      next : (res) =>
      {
        this.data = res;
        console.log(res);
         this.cdr.detectChanges();
        

      },
      error : (err) =>{
        this.messageService.add({
          severity : 'error',
          detail: 'Không lấy được dữ liệu',
        })
      }
    })
  }
  onSupplierChange() {
    if (!this.supplierId) return;
    this.product = []
    this.totalPrice = 0;
    this.loadProductById(this.supplierId);
  }
  loadProductById(id : number){
    if(this.supplierId)
    this.productService.getBySupplier(id).subscribe({
        next : (res) =>
      {
        this.product = res;
        console.log(res);
        this.cdr.detectChanges();

      },
      error : (err) =>{
        this.messageService.add({
          severity : 'error',
          detail: 'Không lấy được dữ liệu',
        })
      }
      })

    
  }
 
toggleProduct(p : any, event: any){
  const checked = event.target.checked;
  if(checked){
    const exists = this.selectedProducts.some(x => x.id === p.productId);
       if (!exists){
          this.selectedProducts.push({
            ...p,
            importQuantity : p.importQuantity 
    })
    console.log(this.selectedProducts)
  }

  }else {
    p.importQuantity = 
      this.selectedProducts =this.selectedProducts.filter(x => Number(x.id) === Number(p.productId));
      console.log(this.selectedProducts)
  }
}
isCheck(id : number): boolean {
  return this.selectedProducts.some(x => x.id ===id);
}
onQuantityChange(p: any) {
    const productIdKey = p.productId ? 'productId' : 'id';
    const targetItem = this.selectedProducts.find(x => x[productIdKey] === p[productIdKey]);
    if (targetItem) {
      targetItem.importQuantity = p.importQuantity;
    }
    this.updateTotalPrice();
  }
  updateTotalPrice() {
    this.totalPrice = this.selectedProducts.reduce((sum, item) => {
      const qty = item.importQuantity || 0;
      const price = item.sellPrice || 0;
      return sum + (qty * price);
    }, 0);
  }
  total(){
    this.totalPrice = 0;

  for (const item of this.selectedProducts) {
    const qty = item.importQuantity || 0;
    const price = item.importPrice || 0;
    
    this.totalPrice += (qty * price); 
  }
  return this.totalPrice;
  }
  importProduct() {
  if (!this.supplierId || this.selectedProducts.length === 0) return;
    const updatePayload = this.selectedProducts.map(p => ({
      ...p,
      quantity: p.importQuantity || 0
    }));

    this.productService.updateMultipleStock(updatePayload).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', detail: "Nhập hàng thành công" });
        this.selectedProducts = []; // Xóa giỏ hàng bên phải
        this.loadProductById(this.supplierId!); // Reload lại danh sách bên trái để thấy số lượng tăng lên
        this.cdr.detectChanges();
      }
  });
}
 
}
