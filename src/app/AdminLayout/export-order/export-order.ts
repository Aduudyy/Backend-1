import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { InvoiceService } from '../../service/InvoiceService/InvoiceService.Service';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../service/CustomerService/CustomerService.service';

@Component({
  selector: 'app-export-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './export-order.html',
  styleUrl: './export-order.css',
})
export class ExportOrder implements OnInit{
 constructor(private cdr : ChangeDetectorRef){}
  invoiceService = inject(InvoiceService)
  customService = inject(CustomerService)
  invoices : any[] =[]
  searchText: string = '';
  searchDate: string = '';
  isPaymentModalOpen = false;
  selectedInvoice: any = {};
  currentClient: any = { id: 1, name: 'Khách hàng A' }; 
  newDebtsValue: number = 0;
  ngOnInit(): void {
    this.loadInvoice()
    
  }
  loadInvoice(){
     this.invoiceService.getAllInvoice().subscribe({
      next : (res) =>{
        this.invoices = res
        console.log(res)
        this.cdr.detectChanges()
      }
    })
  }
  toggleDetail(invoice: any) {
    invoice.showDetail = !invoice.showDetail;
  }
  changeStatus(invoice: any) {
    this.invoiceService.updateStatus(invoice.invoiceId, invoice.status)
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
      invoice.clientName?.toLowerCase().includes(this.searchText.toLowerCase());

    const dateMatch =
      !this.searchDate ||
      invoice.exportDateProduct?.split('T')[0] === this.searchDate;

    return keywordMatch && dateMatch;
  });
}
  openPaymentModal(invoice: any) {
      this.selectedInvoice = { ...invoice };
      this.isPaymentModalOpen = true;
    }
  closePaymentModal() {
    this.isPaymentModalOpen = false;
  }
  calculateDebt(invoice: any): number {
    if (!invoice || !invoice.invoiceDetails) return 0;
    const tongTienHoaDon = invoice.invoiceDetails.reduce(
      (sum: number, item: any) => sum + (item.totalPrice || 0), 0
    );
    const soTienDaThanhToan = invoice.paidAmount || 0; 
    const ketQua = tongTienHoaDon - soTienDaThanhToan;
    return ketQua > 0 ? ketQua : 0;
  }
  isInvoiceEditable(status: string): boolean {
    return status !== 'completed' && status !== 'canceled';
  }
  onSaveDebts(): void {
    const clientId = this.selectedInvoice?.clientId || this.selectedInvoice?.customerId;
    const invoiceId = this.selectedInvoice?.invoiceId;
    const currentStatus = this.selectedInvoice?.status; 
    if (!clientId || !invoiceId) {
      alert('Không tìm thấy thông tin khách hàng hoặc hóa đơn!');
      return;
    }
    let tongTienHoaDon = 0;
    if (this.selectedInvoice.invoiceDetails && this.selectedInvoice.invoiceDetails.length > 0) {
      tongTienHoaDon = this.selectedInvoice.invoiceDetails.reduce(
        (sum: number, item: any) => sum + (item.totalPrice || 0), 0
      );
    }
    const soTienDaThanhToan = this.selectedInvoice.paidAmount || 0; 
    const debtsToSave = this.calculateDebt(this.selectedInvoice);
    console.log(`Gửi dữ liệu: Khách hàng ID: ${clientId} | Nợ mới: ${debtsToSave}`);
    console.log(`Cập nhật trạng thái Hóa đơn ID: ${invoiceId} -> Trạng thái: ${currentStatus}`);
    this.customService.updateDebts(clientId, debtsToSave).subscribe({
      next: (resDebts) => {
        this.invoiceService.updateStatus(invoiceId, currentStatus).subscribe({
          next: (resStatus) => {
            alert('Cập nhật công nợ và trạng thái hóa đơn thành công!');
            this.closePaymentModal();
            this.loadInvoice(); 
          },
          error: (errStatus) => {
            console.error('Lỗi cập nhật trạng thái hóa đơn:', errStatus);
            console.log('Chi tiết lỗi từ Server:', errStatus.error); 
            alert('Công nợ đã lưu, nhưng cập nhật trạng thái hóa đơn thất bại!');
          }
        });
      },
      error: (errDebts) => {
        console.error('Lỗi cập nhật công nợ:', errDebts);
        alert(errDebts.error?.message || 'Có lỗi xảy ra khi cập nhật công nợ!');
      }
    });
  }
}
