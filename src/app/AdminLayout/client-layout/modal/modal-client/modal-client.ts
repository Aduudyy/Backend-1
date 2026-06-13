import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import {FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {  } from 'stream';

@Component({
  selector: 'app-modal-client',
  imports: [ReactiveFormsModule,CommonModule,NgSelectModule],
  templateUrl: './modal-client.html',
  styleUrl: './modal-client.css',
})
export class ModalClient {
  @Input() customerForm!: FormGroup;
  @Input() provinces: any[] = [];
  @Input() wards: any[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
 @Output() provinceChange =new EventEmitter<any>();

  onClose(){
    this.close.emit();
  }

onSave() {
  if (this.customerForm.invalid) {
    this.customerForm.markAllAsTouched();
    return;
  }
  
  this.save.emit(this.customerForm.value);
  console.log(this.customerForm.value);
}

}
