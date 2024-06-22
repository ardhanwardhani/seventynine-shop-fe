import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { OrdersService } from '../../../services/orders.service';
import { Orders } from '../../../models/orders.model';

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    DatePipe
  ],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})

export class ListOrdersComponent implements AfterViewInit{
  orders: Orders[] = [];
  dataSource = new MatTableDataSource<Orders>([]);
  columnsToDisplay = ['date', 'code', 'customer_name', 'total_quantity', 'total_amount', 'actions'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private ordersService: OrdersService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.loadOrders();
  }

  loadOrders(){
    this.ordersService.getAllOrders().subscribe(response => {
      this.orders = response;
      this.dataSource.data = this.orders;
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

  showDetails(order: any) {
    this.router.navigateByUrl(`/order/${order.orderId}/detail`);
  }

  editOrder(order: any) {
    this.router.navigateByUrl(`/order/${order.orderId}/edit`);
  }

  deleteOrder(order: any) {
    this.ordersService.deleteOrder(order.orderId).subscribe(response => {
      this.snackbar.open('Deleted customer successfully', 'Close', {
        duration: 3000,
        panelClass:['bg-success', 'text-white'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.loadOrders();
    });
  }
}