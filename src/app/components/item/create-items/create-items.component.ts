// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
// import { ItemsService } from '../../../services/items.service';

// @Component({
//   selector: 'app-create-items',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
//   templateUrl: './create-items.component.html',
//   styleUrl: './create-items.component.css'
// })

// export class CreateItemsComponent {
//   name = new FormControl('', Validators.required);
//   stock = new FormControl('', [ Validators.required, Validators.min(1) ]);
//   price = new FormControl('', [ Validators.required, Validators.min(1) ]);
//   status = new FormControl(true, Validators.required);

//   itemForm!: FormGroup;
  
//   validationErrors: any = {};
//   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
//   verticalPosition: MatSnackBarVerticalPosition = 'top';

//   constructor(private router: Router , private itemService: ItemsService, private fb: FormBuilder, private snackbar: MatSnackBar){
//     this.itemForm = this.fb.group({
//       name: new FormControl('', Validators.required),
//       stock: new FormControl('', [ Validators.required, Validators.min(1) ]),
//       price: new FormControl('', [ Validators.required, Validators.min(1) ]),
//       status: new FormControl(true, Validators.required)
//     });
//   }

//   onSubmit() {
//     if (this.itemForm.valid) {
//       this.itemService.createItem(this.itemForm.value).subscribe({
//         next: (response) => {
//           console.log('Item created successfully', response);
//           this.snackbar.open('Item created successfully', 'Close', {
//             duration: 3000,
//             panelClass: ['bg-success', 'text-white'],
//             horizontalPosition: this.horizontalPosition,
//             verticalPosition: this.verticalPosition,
//           });
  
//           this.router.navigateByUrl('/item/list', { replaceUrl: true });
//         },
//         error: (error) => {
//           this.validationErrors = error;
//         }
//       });
//     } else {
//       console.log('Invalid input, please recheck the form.');
  
//       this.snackbar.open('Invalid input, please recheck the form.', 'Close', {
//         duration: 3000,
//         panelClass: ['bg-danger', 'text-white'],
//         horizontalPosition: this.horizontalPosition,
//         verticalPosition: this.verticalPosition,
//       });
//     }
//   }

//   get f(){
//     return this.itemForm.controls;
//   }

//   // onSubmit() {
//   //   this.itemService.createItem(this.itemForm.value).subscribe({
//   //     next: (response) => {
//   //       console.log('Item created successfully', response);
//   //       this.snackbar.open('Item created successfully', 'Close', {
//   //         duration: 3000,
//   //         panelClass: ['bg-success', 'text-white'],
//   //         horizontalPosition: this.horizontalPosition,
//   //         verticalPosition: this.verticalPosition,
//   //       });
  
//   //       this.router.navigateByUrl('/item/list', { replaceUrl: true });
//   //     },
//   //     error: (error) => {
//   //       console.error('Full error:', error);

//   //       if (error.message.includes('400')) {
//   //         // Assuming error.message contains JSON string of errors
//   //         try {
//   //           this.validationErrors = JSON.parse(error.message.split('\n')[1]);
//   //         } catch (e) {
//   //           console.error('Could not parse error message:', e);
//   //         }
//   //       } else {
//   //         console.error('An unexpected error occurred:', error);
//   //       }
//   //     }
//   //   });
//   // }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from '../../../services/items.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-items',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  templateUrl: './create-items.component.html',
  styleUrls: ['./create-items.component.css']
})
export class CreateItemsComponent {
  itemForm: FormGroup;
  validationErrors: any = {};
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router, private itemService: ItemsService, private fb: FormBuilder, private snackbar: MatSnackBar) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]],
      isAvailable: ['', Validators.required]
    });
  }

  get f() {
    return this.itemForm.controls;
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.itemService.createItem(this.itemForm.value).subscribe({
        next: (response) => {
          console.log('Item created successfully', response);
          this.snackbar.open('Item created successfully', 'Close', {
            duration: 3000,
            panelClass: ['bg-success', 'text-white'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.router.navigate(['/item/list']);
        },
        error: (error) => {
          console.error('Error creating item', error);
          this.snackbar.open('Error creating item', 'Close', {
            duration: 3000,
            panelClass: ['bg-danger', 'text-white'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}

