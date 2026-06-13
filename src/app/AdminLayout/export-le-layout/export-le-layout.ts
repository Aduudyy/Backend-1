import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../service/orderService/OrderService.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/authService/authService.Service';

@Component({
  selector: 'app-export-le-layout',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './export-le-layout.html',
  styleUrl: './export-le-layout.css',
})
export class ExportLeLayout implements OnInit {
 constructor(private cdr : ChangeDetectorRef){}
   invoiceService = inject(OrderService)
   userService = inject(AuthService)
   invoices : any
   user : any
   searchText: string = '';
  searchDate: string = '';
 
   ngOnInit(): void {
     this.loadInvoice()
     
   }
   loadInvoice(){
      this.invoiceService.getAll().subscribe({
       next : (res) =>{
         this.invoices = res
         const userId = res[0].userId;
         this.loadUser(userId);
         console.log(res)
         this.cdr.detectChanges()
       }
     })
   }
   loadUser(userId : number){
    this.userService.getById(userId).subscribe({
        next : (res)=>{
          this.user = res;
        }
    })
   }
   toggleDetail(invoice: any) {
     invoice.showDetail = !invoice.showDetail;
   }
   changeStatus(invoice: any) {
   this.invoiceService.updateStatus(invoice.orderId, invoice.status)
     .subscribe({
       next: () => {
         console.log('Update status success');
       },
       error: (err) => {
         console.error(err);
       }
     });
 }
 get filteredInvoices() {
  return this.invoices.filter((invoice: any) => {

    const keywordMatch =
      !this.searchText ||
      invoice.invoiceCode?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      invoice.fullName?.toLowerCase().includes(this.searchText.toLowerCase());

    const dateMatch =
      !this.searchDate ||
      invoice.orderDate?.split('T')[0] === this.searchDate;

    return keywordMatch && dateMatch;
  });
}
  
}