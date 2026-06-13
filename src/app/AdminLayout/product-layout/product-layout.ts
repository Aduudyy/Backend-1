import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductServices } from '../../service/productService/productService.service';
import { MessageService } from 'primeng/api';
import { NgIf, NgFor, NgForOf, CommonModule } from "@angular/common";
import { Toast } from "primeng/toast";
import { Products } from "../../models/productModel/Products.model";
import { UpdateModel } from "./Modal/update-model/update-model";
import { SupplierService } from '../../service/productService/supplierService.service';
declare var bootstrap: any;
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-product-layout',
  imports: [ReactiveFormsModule, NgIf, Toast,  CommonModule, UpdateModel],
  templateUrl: './product-layout.html',
  styleUrl: './product-layout.css',
})
export class ProductLayout implements OnInit{
  constructor(private fb : FormBuilder,private cdr: ChangeDetectorRef){}
  private productService = inject(ProductServices)
  private messageService = inject(MessageService)
  productForm!: FormGroup
  selectedFile!: File;
  previewImage : string | ArrayBuffer | null = null;
  products : Products[] = []
  paginatedProducts: Products[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  pageNumbers: number[] = [];
  isEditMode: boolean = false;
  editingId: number | null = null;
  isModalOpen = false;
  currentProductId: number | null = null;
  supplierService = inject(SupplierService)
  data : any[] = []
  unit : any[] =[]
  categories : any[] =[]
  

  ngOnInit(): void {
    this.loadSupplier()
    this.loadProduct()
    this.loadUnit()
    this.loadCategory()
    
    this.productForm = this.fb.group({
      productName : ['',Validators.required],
      productPrice : ['',Validators.required],
      quantity : ['',Validators.required],
      supplierId : ['',Validators.required],
      productionDate : ['',Validators.required],
      expery: ['',Validators.required],
      unitId: [],
      sellPrice: [],
      importPrice: []
    });
  }
  
  onFileSelected(file: File) {
    if (file) {
      this.selectedFile = file;
      console.log(this.selectedFile);
      this.productForm.patchValue({
        imageUrl: file.name
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
}
// CRUD
  loadSupplier(){
    this.supplierService.getAllSupplier().subscribe({
      next : (res) =>
      {
        this.data = res;
      },
      error : (err) =>{
        this.messageService.add({
          severity : 'error',
          detail: 'Không lấy được dữ liệu Supplier',
        })
      }
    })
  }
  loadUnit(){
    this.productService.getAllUnit().subscribe({
      next : (res) =>
      {
        this.unit = res;
        console.log(res);
      },
      error : (err) =>{
        this.messageService.add({
          severity : 'error',
          detail: 'Không lấy được dữ liệu Unit',
        })
      }
    })
  }
  loadCategory(){
    this.productService.getAllCategory().subscribe({
      next : (res) =>
      {
        this.categories = res;
      },
      error : (err) =>{
        this.messageService.add({
          severity : 'error',
          detail: 'Không lấy được dữ liệu Category',
        })
      }
    })
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
  
  deleteProduct(id: number){
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")){
      this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products =
          [...this.products.filter(
            p => p.productId !== id
          )]
        this.setupPagination();
        this.messageService.add({
          severity:'success',
          detail:'Xoá sản phẩm thành công'
        }
        )
      },
      error: (err) => {
        console.log(err);
      }
    });
    }
  }
  editProduct(p: any) {
    this.isEditMode = true;
    this.currentProductId = p.productId;
    this.productForm.patchValue({
      productName: p.productName,
      sellPrice: p.sellPrice,
      importPrice: p.importPrice,
      quantity: p.quantity,
      supplierId: p.supplierId,
      productionDate: p.productionDate ? p.productionDate.split('T')[0] : '',
      expery: p.expery ? p.expery.split('T')[0] : '',
      unitId: p.unitId,
    });
    this.previewImage = 'https://localhost:7271' + p.imageUrl;
    this.isModalOpen = true;
  }

 // ================= MODAL CONTROL =================
  openModal(){
    const modal = document.getElementById('productModal');
    if(modal){
      (window as any).bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }
  openAddModal() {
    this.isEditMode = false;
    this.productForm.reset();
    this.previewImage = null;
    this.isModalOpen = true;
  }
  resetForm(){
    this.productForm.reset();
    this.previewImage = null;
    this.selectedFile = null as any;
    this.isEditMode = false;
    this.editingId = null;
  }
  onHandleSave(){
      const formData = new FormData();
      if (this.currentProductId){
        formData.append('ProductId', this.currentProductId.toString());
      }
      formData.append('ProductName', this.productForm.get('productName')?.value);
      formData.append('SellPrice', this.productForm.get('sellPrice')?.value);
      formData.append('importPrice', this.productForm.get('importPrice')?.value);
      formData.append('Quantity', this.productForm.get('quantity')?.value);
      formData.append('SupplierId', this.productForm.get('supplierId')?.value);
      formData.append('ProductionDate', this.productForm.get('productionDate')?.value);
      formData.append('Expery', this.productForm.get('expery')?.value);
      formData.append('UnitId', this.productForm.get('unitId')?.value);
      if (this.selectedFile) {
        formData.append('ImageFile', this.selectedFile);
      } 
      else if (this.isEditMode && this.previewImage) {
        const oldPath = (this.previewImage as string)
          .replace('https://localhost:7271', '');
        formData.append('ImageFile', oldPath);
    }
    console.log("as",[...formData.entries()]);
    if (this.isEditMode) {
      if (this.currentProductId) {
        this.putProduct(this.currentProductId, formData);
      } else {
        console.error('Không tìm thấy ID sản phẩm để cập nhật!');
      }
    } else {
      this.postProduct(formData);
    }
    }

  postProduct(formData: FormData) {
    this.productService.addProduct(formData).subscribe({
      next: (res : any) =>{
          console.log("Thành công:", res);
          this.messageService.add({
            severity: 'success',
            detail:'Thêm sản phẩm thành công'
          });
          this.loadProduct(); 
          this.closeModal(); 
        },
        error: (err)=>{
          console.log("Lỗi chi tiết:", err);
          this.messageService.add({
            severity: "error",
            detail: 'Thêm sản phẩm thất bại'
          })
        }
    });
}

// 4. HÀM GỬI LỆNH CẬP NHẬT
  putProduct(id: number, formData: FormData) { 
    this.productService.updateProduct(id, formData).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Cập nhật sản phẩm thành công'
        });
        this.loadProduct(); // Tải lại danh sách sau khi sửa
        this.closeModal();   // Đóng modal sau khi thành công
      },
      error: (err) => {
        console.log("Lỗi cập nhật:", err);
        this.messageService.add({
          severity: "error",
          detail: 'Cập nhật thất bại'
        });
      }
    });
  }

// Phân trang
setupPagination() {
      this.totalPages = Math.ceil(
        this.products.length / this.pageSize
      );
      this.pageNumbers = Array(this.totalPages)
        .fill(0)
        .map((_, i) => i + 1);
      this.changePage(1);
}

changePage(page: number) {
  this.currentPage = page;
  const startIndex =
    (page - 1) * this.pageSize;
  const endIndex =
    startIndex + this.pageSize;
  this.paginatedProducts =
    this.products.slice(startIndex, endIndex);
}
}
