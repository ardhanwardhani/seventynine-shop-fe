import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Customers } from '../../../models/customers.model';
import { CustomersService } from '../../../services/customers.service';


@Component({
  selector: 'app-list-deactive-customers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  templateUrl: './list-deactive-customers.component.html',
  styleUrl: './list-deactive-customers.component.css'
})
export class ListDeactiveCustomersComponent implements AfterViewInit{
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private customerService: CustomersService,
    private snackbar: MatSnackBar,
  ) {}
  
  customers: Customers[] = [];
  dataSource = new MatTableDataSource<Customers>([]);
  dataLoaded = false;
  columnsToDisplay = ['code', 'name', 'address', 'phone', 'actions'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.loadCustomers();
  }

  loadCustomers(){
    this.customerService.getDeactiveCustomers().subscribe(response => {
      this.customers = response;
      this.dataSource.data = this.customers;
      this.dataLoaded = true;
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

  activateCustomer(id: number): void {
    this.customerService.activateCustomer(id).subscribe({
      next: (response) => {
        this.snackbar.open(response.message, 'Close', {
          duration: 3000,
          panelClass: ['bg-success', 'text-white'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.loadCustomers(); // Reload customers after activation
      },
      error: (error) => {
        console.error('Error activating customer', error);
        this.snackbar.open(error.error.message, 'Close', {
          duration: 3000,
          panelClass: ['bg-danger', 'text-white'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }
}