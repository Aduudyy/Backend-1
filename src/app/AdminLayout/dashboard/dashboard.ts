import { Component, HostListener, inject } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { CommonModule, NgIf } from "@angular/common";


@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, RouterOutlet, NgIf, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
 sidebarOpen = false;
 private route = inject(Router)
 showXuatHang = false;

  toggleSidebar(): void {

    // Chỉ hoạt động khi màn hình nhỏ
    if (window.innerWidth <= 992) {
      this.sidebarOpen = !this.sidebarOpen;
    }

  }

  closeSidebar(): void {

    if (window.innerWidth <= 992) {
      this.sidebarOpen = false;
    }

  }

  @HostListener('window:resize')
  onResize(): void {

    // Khi resize lên desktop
    // reset sidebar về trạng thái bình thường
    if (window.innerWidth > 992) {
      this.sidebarOpen = false;
    }

  }
  logout(){
    localStorage.clear();
    this.route.navigate(['/LoginMain'])
  }
}
