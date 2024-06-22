import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../../services/items.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.css']
})
export class UpdateItemsComponent implements OnInit {
  itemForm: FormGroup;
  validationErrors: any = {};
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  itemId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.itemForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]],
      isAvailable: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
    });

    if (this.itemId) {
      this.itemService.getItem(this.itemId).subscribe(item => {
        this.itemForm.patchValue(item);
      });
    }
  }

  get f() {
    return this.itemForm.controls;
  }

  onSubmit() {
    if (this.itemForm.valid) {
      if (this.itemId) {
        this.itemService.updateItem(this.itemId, this.itemForm.value).subscribe({
          next: (response) => {
            console.log('Item updated successfully', response);
            this.snackbar.open('Item updated successfully', 'Close', {
              duration: 3000,
              panelClass: ['bg-success', 'text-white'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.router.navigate(['/item/list']);
          },
          error: (error) => {
            console.error('Error updating item', error);
            this.snackbar.open('Error updating item', 'Close', {
              duration: 3000,
              panelClass: ['bg-danger', 'text-white'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
