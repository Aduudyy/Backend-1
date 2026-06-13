import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../service/CustomerService/CustomerService.service';
import { MessageService } from 'primeng/api';
import { ModalClient } from "./modal/modal-client/modal-client";
import { CommonModule, NgIf } from "@angular/common";
import { SupplierService } from '../../service/productService/supplierService.service';
import { Toast, ToastModule } from "primeng/toast";

@Component({
  selector: 'app-client-layout',
  imports: [ModalClient, NgIf, ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './client-layout.html',
  styleUrl: './client-layout.css',
})
export class ClientLayout  implements OnInit{
  constructor(private fb : FormBuilder, private cdr: ChangeDetectorRef){}
  cuustomerService = inject(CustomerService)
  supplierService = inject(SupplierService)
  messageService = inject(MessageService)
  modalACtive : boolean = false;
  customer : any[] = []
  customerForm! : FormGroup
  provinces: any[] = []
  wards: any[] = []
  ngOnInit(): void {
    this.loadCustomer()
    this.loadProvince()
    this.customerForm = this.fb.group({
      clientName: ['', Validators.required],
      customName: [''],
      numberPhone: ['', [Validators.required,Validators.pattern('^[0-9]{10}$')]],
      province: [''],
      ward: [''],
      debt: [0],
      note: [''],
    })
    this.customerForm.get('addresss.wardId')?.setValue('');
  }
  loadCustomer(){
    this.cuustomerService.getAllCustomer().subscribe({
      next : (res) =>{
        this.customer = res;
        console.log(res)
        this.cdr.detectChanges();
      },
      error : () =>
      {
        this.messageService.add({
          severity : 'error',
          detail: 'Không có khách hàng nào',        
        })
      }
    })
  }
   loadProvince() {
    this.supplierService.getAllProvince().subscribe({
      next: (res) => {
        this.provinces = res;
        console.log(res);
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
   addCustomer(data : any){
      if (this.customerForm.invalid) {
        this.customerForm.markAllAsTouched();
        return;
      }

  this.cuustomerService.addCustomer(data).subscribe({
    next: (res) => {
      this.messageService.add({
        severity: 'success',
        detail: 'Thêm khách hàng mới thành công',
      });
      this.closeModal();
      this.loadCustomer();
    },
    error: (err) => {
      this.messageService.add({
        severity: 'error',
        detail: 'Thêm khách hàng mới thất bại',
      });
    }
  });

  }
  onProvinceChange(provinceId: number) {
    this.loadWard(Number(provinceId));
}
onProvinceSelected(event: any) {

  const select = event.target;

  const provinceId =
    select.options[select.selectedIndex]
    .getAttribute('data-id');

  this.loadWard(Number(provinceId));

}
 

  openModal(){
    this.modalACtive = true;
  }
  closeModal(){
    this.modalACtive = false;
  }

}
