import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CustomersService } from '../../../services/customers.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-customers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './create-customers.component.html',
  styleUrl: './create-customers.component.css'
})
export class CreateCustomersComponent {
  selectedImage: File | undefined;
  customerForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  imageError: boolean = true;

  constructor(
    private router: Router,
    private customerService: CustomersService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  )
  {
    this.customerForm = this.fb.group({
      name:['', Validators.required],
      phone:['', Validators.required],
      address:['', Validators.required],
      isActive:['', Validators.required]
    });
  }

  get f() {
    return this.customerForm.controls;
  }

  onImageSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedImage = fileList[0];
      this.imageError = false;
    }
  }

  onSubmit(){
    if(this.customerForm.valid && this.selectedImage){
      this.customerService.createCustomer(this.customerForm.value, this.selectedImage).subscribe({
        next: (customer) => {
          console.log('Customer created successfully', customer);
          
          this.snackbar.open('Customer created successfully', 'Close', {
            duration: 3000,
            panelClass:['bg-success', 'text-white'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.router.navigateByUrl('/customer/list',{ replaceUrl:true});
        },
        error: (error) => {
          console.log('Invalid input, please recheck the form', error);

          this.snackbar.open('Invalid input, please recheck the form', 'Close', {
            duration: 3000,
            panelClass:['bg-danger', 'text-white'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
    }
  }
}
