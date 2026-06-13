import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgClass } from "@angular/common";
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { InvoiceService } from '../../service/InvoiceService/InvoiceService.Service';
import { ProductServices } from '../../service/productService/productService.service';
import { CustomerService } from '../../service/CustomerService/CustomerService.service';

@Component({
  selector: 'app-statistical-report',
  imports: [ CommonModule, FormsModule],
  templateUrl: './statistical-report.html',
  styleUrl: './statistical-report.css',
})
export class StatisticalReport implements OnInit {
  selectedFilter = 'month';
  constructor(private cdr : ChangeDetectorRef){}
  invoiceService = inject(InvoiceService)
  productService = inject(ProductServices)
  customerService = inject(CustomerService)
  
  invoice : any[] =[]
  product : any[] =[]
  customer : any[] =[]
  reportData : any[] =[]
  isLoading: boolean = true;
  grandTotalRevenue: number = 0;

  ngOnInit(): void {
  this.isLoading = true;
  this.loadInvoice();
  this.loadProfitReport();
}

loadInvoice() {
  this.invoiceService.getAllInvoice().subscribe({
    next: (res) => {
      this.invoice = res;
      this.cdr.detectChanges();
    }
  });

  this.productService.getAll().subscribe({
    next: (res) => {
      this.product = res;
      this.cdr.detectChanges();
    }
  });

  this.customerService.getAllCustomer().subscribe({
    next: (res) => {
      this.customer = res;
      this.cdr.detectChanges();
    }
  });
}

loadProfitReport() {
  this.isLoading = true;

  this.invoiceService.getProfitReport().subscribe({
    next: (data) => {

      const safeData = Array.isArray(data) ? data : [];
      console.log('REPORT DATA:', data);

      this.reportData = safeData;

      this.grandTotalRevenue = safeData.reduce(
        (sum: number, item: any) =>
          sum + (Number(item?.totalRevenue) || 0),
        0
      );

      this.isLoading = false;
      this.cdr.detectChanges();
    },

    error: (err) => {
      console.error('Lỗi khi tải báo cáo:', err);

      this.reportData = [];
      this.grandTotalRevenue = 0;
      this.isLoading = false;
    }
  });
}

  topProducts = [
    {
      name: 'Kem Chocolate',
      sold: 320
    },
    {
      name: 'Kem Matcha',
      sold: 280
    },
    {
      name: 'Kem Dâu',
      sold: 260
    },
    {
      name: 'Kem Vanilla',
      sold: 210
    }
  ];

}
