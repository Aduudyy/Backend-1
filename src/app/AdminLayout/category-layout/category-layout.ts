import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgForOf } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../service/Category/category.service';



@Component({
  selector: 'app-category-layout',
  imports: [NgClass, FormsModule, NgForOf, CommonModule],
  templateUrl: './category-layout.html',
  styleUrl: './category-layout.css',
})
export class CategoryLayout implements OnInit {
  categories: any[] = [];
  searchText = '';
  categoryService = inject(CategoryService)
   bootstrap: any;
 category: any = {
  categoryId: 0,
  categoryName: '',
  isActive: true,
  parentId: null
};

isEditMode = false;

  ngOnInit(): void {
    this.loadCategories()
  }
  loadCategories(){
    this.categoryService.getAll().subscribe({
      next : (res) =>{
        this.categories = res;
        console.log(res)
      },
      error: (err) => {
      console.log('Lỗi load', err);
    }
    })
  }
 
  get filteredCategories() {
    return this.categories.filter(x =>
      !this.searchText ||
      x.categoryName
        ?.toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }

  resetForm() {
    this.isEditMode = false;
    this.category = {
      categoryId: 0,
      categoryName: '',
      isActive: true,
      parentId: null
    };
  }
  addCategory() {

    if (!this.category.categoryName?.trim()) {
      alert('Vui lòng nhập tên danh mục');
      return;
    }

    this.categoryService.create(this.category).subscribe({
      next: (res) => {
        alert('Thêm danh mục thành công');
        (document.getElementById('closeModalBtn') as HTMLButtonElement)?.click();
        this.loadCategories();
        this.resetForm();
        window.location.reload(); 
        

      },
      error: (err) => {
        console.log(err);
        alert('Thêm danh mục thất bại');
      }
    });
  }

  updateCategory() {

    if (!this.category.categoryname?.trim()) {
      alert('Vui lòng nhập tên danh mục');
      return;
    }

    this.categoryService
      .update(this.category.categoryId, this.category)
      .subscribe({
        next: () => {
          alert('Cập nhật thành công');
          this.loadCategories();
          this.resetForm();
        },
        error: (err) => {
          console.log(err);
          alert('Cập nhật thất bại');
        }
      });
  }
  deleteCategory(id: number) {

    if (!confirm('Bạn có chắc muốn xoá?')) return;

    this.categoryService.delete(id).subscribe({
      next: (res) => {
        alert(res); // sẽ hiện "Xóa thành công"
        this.loadCategories();
          window.location.reload();
      },
      error: (err) => {
        console.log(err);
        alert('Xoá thất bại');
      }
    });

  }

}
