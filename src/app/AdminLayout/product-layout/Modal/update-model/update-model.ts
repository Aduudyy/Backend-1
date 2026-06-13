import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from "@angular/common";


@Component({
  selector: 'app-update-model',
  imports: [NgIf,ReactiveFormsModule,CommonModule],
  templateUrl: './update-model.html',
  styleUrl: './update-model.css',
})
export class UpdateModel {
  @Input() productForm!: FormGroup;
  @Input() previewImage: string | ArrayBuffer | null = null;
  @Input() isEditMode = false;
  @Input() supplier: any[] = [];
  @Input() unit: any[] = [];
  @Input() categories : any[] = [];

  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() fileChange = new EventEmitter<File>();
  selectedFile: File | null = null;

  onClose(){
    this.close.emit();
  }

  onSave(){
    this.save.emit();
  }
  onFileSelected(event: any){

  const file = event.target.files[0];

  if(file){
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };

    reader.readAsDataURL(file);

    // gửi file ra ngoài nếu cần
    this.fileChange.emit(file);
  }
}

}
