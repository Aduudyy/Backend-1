import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:7271/api/category';

  constructor(private http: HttpClient) { }

  // Lấy tất cả danh mục
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Lấy theo id
  getById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  // Thêm mới
  create(category: any): Observable<any> {
    return this.http.post(this.apiUrl, category);
  }

  // Cập nhật
  update(id: number, category: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, category);
  }

  // Xóa
  delete(id: number) {
  return this.http.delete(
    `${this.apiUrl}/${id}`,
    { responseType: 'text' }
  );
}
}