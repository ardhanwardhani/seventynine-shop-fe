import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

import { ItemsService } from '../../../services/items.service';

import { Items } from '../../../models/items.model';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent implements AfterViewInit {
  constructor(
    private _liveAnnouncer: LiveAnnouncer, 
    private itemsService: ItemsService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}


  items: Items[] = [];
  dataSource = new MatTableDataSource<Items>([]);
  columnsToDisplay = ['code', 'name', 'price', 'stock', 'actions'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.loadItems();
  }

  loadItems(){
    this.itemsService.getAvailableItems().subscribe(response => {
      this.items = response;
      this.dataSource.data = this.items;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  showDetails(itemId: number) {
    this.router.navigateByUrl(`/item/${itemId}/detail`);
  }

  editItem(itemId: number) {
    this.router.navigateByUrl(`/item/${itemId}/edit`);
  }

  unavailableItem(id: number): void {
    this.itemsService.unavailableItem(id).subscribe({
      next: (response) => {
        this.snackbar.open(response.message, 'Close', {
          duration: 3000,
          panelClass: ['bg-success', 'text-white'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.loadItems();
      },
      error: (error) => {
        console.error('Error set item to unavailable', error);
        this.snackbar.open(error.error.message, 'Close', {
          duration: 3000,
          panelClass: ['bg-danger', 'text-white'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  deleteItem(id: number) {
    this.itemsService.deleteItem(id).subscribe(response => {
      this.snackbar.open('Deleted customer successfully', 'Close', {
        duration: 3000,
        panelClass:['bg-success', 'text-white'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.loadItems();
    });
  }
}