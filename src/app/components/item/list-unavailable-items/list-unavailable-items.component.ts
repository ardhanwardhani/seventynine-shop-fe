import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Items } from '../../../models/items.model';
import { ItemsService } from '../../../services/items.service';


@Component({
  selector: 'app-list-unavailable-items',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  templateUrl: './list-unavailable-items.component.html',
  styleUrl: './list-unavailable-items.component.css'
})
export class ListUnavailableItemsComponent implements AfterViewInit{
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private itemsService: ItemsService,
    private snackbar: MatSnackBar,
  ) {}
  
  customers: Items[] = [];
  dataSource = new MatTableDataSource<Items>([]);
  columnsToDisplay = ['code', 'name', 'price', 'stock', 'actions'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.loadCustomers();
  }

  loadCustomers(){
    this.itemsService.getUnavailableItems().subscribe(response => {
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

  availableItem(id: number): void {
    this.itemsService.availableItem(id).subscribe({
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
        console.error('Error set availability item', error);
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