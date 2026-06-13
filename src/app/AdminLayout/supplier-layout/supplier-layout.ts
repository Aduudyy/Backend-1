import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { SupplierService } from '../../service/productService/supplierService.service';
import { MessageService } from 'primeng/api';
import { CommonModule, NgForOf, NgIf } from "@angular/common";
import { AddModalSuppiler } from "./Modal/add-modal-suppiler/add-modal-suppiler";
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-supplier-layout',
  imports: [NgForOf, AddModalSuppiler, NgIf, ReactiveFormsModule, CommonModule,NgSelectModule],
  templateUrl: './supplier-layout.html',
  styleUrl: './supplier-layout.css',
})
export class SupplierLayout  implements OnInit{
  
  constructor(private fb : FormBuilder , private cdr: ChangeDetectorRef){}
  supplierService = inject(SupplierService)
  supplierForm! : FormGroup
  data : any[] = []
  provinces: any[] = []
  wards: any[] = []
  message = inject(MessageService)
  isOpenModal : boolean  = false
  pro : any[] =[]
  provinceMap: { [key: number]: string } = {};
  
  ngOnInit(): void {
    this.loadSupplier();    
    this.loadProvince();
    this.supplierForm = this.fb.group(
      {
        supplierName : ['',Validators.required],
        phoneSupplier : ['',Validators.required],
        addresss: this.fb.group({
        provinceId: [''],
        wardId: [''],
        detailAddress: ['']
         })
      }
    )
    this.supplierForm.get('addresss.wardId')?.setValue('');
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
        this.message.add({
          severity : 'error',
          detail: 'Không lấy được dữ liệu',
        })
      }
    })
  }
  loadProvince() {
    this.supplierService.getAllProvince().subscribe({
      next: (res) => {
      this.provinces = res;
      res.forEach((x: any) => {
        this.provinceMap[x.provinceId] = x.provinceName;
      });
    }
    });
  }


  loadWard(provinceId: number) {
    this.supplierService
      .getWardByProvince(provinceId)
      .subscribe({
        next: (res) => {
          this.wards = res;
     
        }
      });
  }
  addSupplier(data : any){
      if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      return
    }
      data.addresss.provinceId =Number(data.addresss.provinceId);
      data.addresss.wardId =Number(data.addresss.wardId);
      this.supplierService.addSupplier(data).subscribe({
        next : (res)=>{
          this.message.add({
            severity: 'success',
            detail:'Thêm nhà cung cấp mới thành công',
          })
          this.closeModal();
          this.loadSupplier()
        },
        error : (err) =>{
          this.message.add({
            severity: 'error',
            detail:'Thêm nhà cung cấp mới thất bại',
          })
        }
      })
  }
  onProvinceChange(provinceId: number) {
    this.loadWard(provinceId);
}
 


 closeModal() {
  this.isOpenModal = false;

  (document.activeElement as HTMLElement)?.blur();

  this.supplierForm.reset({
    supplierName: '',
    phoneSupplier: '',
    addresss: {
      provinceId: '',
      wardId: '',
      detailAddress: ''
    }
  });

  this.wards = [];
}
  openModal(){
    this.isOpenModal = true;
     setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 0);
  }
  searchProvincename(id: number): string {
    return this.provinceMap[id] || '';
  }

}
