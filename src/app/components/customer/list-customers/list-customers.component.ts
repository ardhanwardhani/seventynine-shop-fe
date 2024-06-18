import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { Customers } from '../../../models/customers.model';
import { CustomersService } from '../../../services/customers.service';


@Component({
  selector: 'app-list-customers',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.css'
})
export class ListCustomersComponent implements AfterViewInit{
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private customerService: CustomersService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
  
  customers: Customers[] = [];
  dataSource = new MatTableDataSource<Customers>([]);
  columnsToDisplay = ['code', 'name', 'address', 'phone','is_active', 'actions'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPositioin: MatSnackBarVerticalPosition = 'top';

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.loadCustomer();
  }

  loadCustomer(){
    this.customerService.getAllCustomers().subscribe(response => {
      this.customers = response;
      this.dataSource.data = this.customers;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // sorting
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  showDetails(customer: any) {
    this.router.navigateByUrl(`/customer/${customer.id}/detail`);
  }

  editCustomer(customer: any) {
      this.router.navigateByUrl(`/customer/${customer.id}/edit`);
  }

  deleteCustomer(customer: any) {
      // Implementasi hapus data pelanggan
      this.customerService.deleteCustomer(customer.id).subscribe(response => {
        this.snackbar.open('Deleted customer successfully', 'Close', {
          duration: 3000,
          panelClass:['bg-success', 'text-white'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPositioin,
        });
        this.loadCustomer();
      });
  }
}