import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../service/CustomerService/CustomerService.service';
import { ProductServices } from '../../service/productService/productService.service';
import { Toast } from "primeng/toast";
import { MessageService } from 'primeng/api';
import { InvoiceService } from '../../service/InvoiceService/InvoiceService.Service';

@Component({
  selector: 'app-product-export',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Toast],
  templateUrl: './product-export.html',
  styleUrl: './product-export.css',
})
export class ProductExport implements OnInit {
  constructor(private fb : FormBuilder){}
  cdr = inject(ChangeDetectorRef)
  customerService = inject(CustomerService)
  productService = inject(ProductServices)
  invoiceService = inject(InvoiceService)
  customers : any[] = []
  products : any[] = [] 
  selectedCustomer: any[] = []
  totalPrice: number = 0;
  soluong : number = 0;
  clientForm!: FormGroup
  messageService = inject(MessageService)
  ngOnInit(): void {
    this.loadCutomer()
    this.loadProduct()
    this.clientForm = this.fb.group({
      clientId : ['',Validators.required],
    })


    
  }
  loadCutomer(){
    this.customerService.getAllCustomer().subscribe({
      next: (res) =>{
        this.customers = res;
        this.cdr.detectChanges()
        console.log(this.customers)
      }
    })
  }
  loadProduct(){
    this.productService.getAll().subscribe({
      next : (res) =>{
        this.products = res;
        this.cdr.detectChanges()
        console.log(res)
      }
    })
  }
 toggleProduct(p : any, event: any){
    const checked = event.target.checked;
    if(checked){
      const exists = this.selectedCustomer.some(x => x.id === p.productId);
        if (!exists){
            this.selectedCustomer.push({
              ...p,
              importQuantity : p.importQuantity 
      })
      console.log(this.selectedCustomer)
    }

    }else {
this.selectedCustomer = this.selectedCustomer.filter(x => {
      const currentId = x.productId || x.id;
      return Number(currentId) !== Number(p.productId);
    });       
    }
  }
isCheck(id : number): boolean {
  return this.selectedCustomer.some(x => x.id ===id);
}
onQuantityChange(p: any) {
    const productIdKey = p.productId ? 'productId' : 'id';
    const targetItem = this.selectedCustomer.find(x => x[productIdKey] === p[productIdKey]);
    if (targetItem) {
      targetItem.importQuantity = p.importQuantity;
    }
    this.updateTotalPrice();
  }
  updateTotalPrice() {
    this.totalPrice = this.selectedCustomer.reduce((sum, item) => {
      const qty = item.importQuantity || 0;
      const price = item.sellPrice || 0;
      return sum + (qty * price);
    }, 0);
  }
  total(){
    this.totalPrice = 0;
    for (const item of this.selectedCustomer) {
        const qty = item.importQuantity || 0;
        const price = item.sellPrice || 0;
        this.totalPrice += (qty * price); // Cộng dồn vào tổng tiền
      }
      return this.totalPrice;
  }
  exportProduct() {
    if ( this.selectedCustomer.length === 0) return;

      // Map chuẩn tên thuộc tính: productId và quantity (chữ thường giống y hệt class C# nhận)
      const updatePayload = this.selectedCustomer.map(p => ({
        ...p,
        quantity: p.importQuantity || 0
      }));

      this.productService.updateExportStock(updatePayload).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', detail: "Nhập hàng thành công" });
          this.selectedCustomer = []; // Xóa giỏ hàng bên phải
          this.loadProduct(); //
          this.cdr.detectChanges();
        }
    });
  }
  addInvoice() {
      const clientId = this.clientForm.get('clientId')?.value;
      if (!clientId) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Thông báo',
          detail: 'Vui lòng chọn khách hàng!'
        });
        return;
      }

      if (this.selectedCustomer.length === 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Thông báo',
          detail: 'Vui lòng chọn ít nhất một sản phẩm!'
        });
        return;
      }

      const currentCustomer = this.customers.find(
        c => Number(c.clientId) === Number(clientId)
      );

      const customerName =
        currentCustomer?.customName ||
        currentCustomer?.clientName ||
        'Khách hàng lẻ';

      const payload = {
        clientId: Number(clientId),
        clientName: customerName,

        products: this.selectedCustomer.map(p => ({
          productId: Number(p.productId || p.id),
          quantity: Number(p.importQuantity || 0)
        }))
      };

      this.invoiceService.addInvoice(payload).subscribe({
        next: (res) => {
          this.exportProduct();

          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Tạo hóa đơn xuất hàng thành công!'
          });

          this.selectedCustomer = [];
          this.totalPrice = 0;
          this.clientForm.reset();

          this.loadProduct();
          this.cdr.detectChanges();
        },

        error: (err) => {
          console.error('Lỗi khi tạo hóa đơn:', err);

          this.messageService.add({
            severity: 'error',
            summary: 'Thất bại',
            detail: 'Không thể tạo hóa đơn, vui lòng kiểm tra lại!'
          });
    }
  });
}
}
