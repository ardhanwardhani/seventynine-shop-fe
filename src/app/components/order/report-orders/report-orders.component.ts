import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { OrdersService } from '../../../services/orders.service';
import { saveAs } from 'file-saver';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-report-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './report-orders.component.html',
  styleUrl: './report-orders.component.css'
})
export class ReportOrdersComponent {
  datesForm!: FormGroup;
  startDate!: string;
  endDate!: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private ordersService: OrdersService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ){
    this.datesForm = this.fb.group({
      startDate:['', Validators.required],
      endDate:['', Validators.required]
    });
  }

  onDownload(): void {
    if (this.datesForm.value) {
      this.ordersService.downloadReport(this.datesForm.value.startDate, this.datesForm.value.endDate).subscribe((response: HttpResponse<Blob>) => {
        if (response.body) {
          const filename = this.getCustomFilenameFromContentDisposition(this.datesForm.value.startDate, this.datesForm.value.endDate);
          saveAs(response.body, filename);
        } else {
          console.error('Response body is null or undefined.');
        }
      });
    }
  }
  
  private getCustomFilenameFromContentDisposition(startDate: string, endDate: string): string {
    const formattedStartDate = startDate.replace(/-/g, '');
    const formattedEndDate = endDate.replace(/-/g, '');
    return `orderReport_${formattedStartDate}_${formattedEndDate}.pdf`;
  }
}
