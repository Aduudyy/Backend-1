import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-modal-suppiler',
  imports: [ReactiveFormsModule,CommonModule,NgSelectModule],
  templateUrl: './add-modal-suppiler.html',
  styleUrl: './add-modal-suppiler.css',
})
export class AddModalSuppiler {
  @Input() supplierForm!: FormGroup
  @Input() provinces: any[] = [];
  @Input() wards: any[] = [];

  
 @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Output() provinceChange = new EventEmitter<number>();
  @Output() districtChange = new EventEmitter<number>();

 onSave() {
  if (this.supplierForm.invalid) {
    this.supplierForm.markAllAsTouched();
    return;
  }
  
  this.save.emit(this.supplierForm.value);
  console.log(this.supplierForm.value);
}
onClose() {
  this.close.emit();
}
onProvinceChange(event: Event) {

  const value = (event.target as HTMLSelectElement).value;

  this.provinceChange.emit(Number(value));

}

 
}
