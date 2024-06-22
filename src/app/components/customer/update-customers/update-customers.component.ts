import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CustomersService } from '../../../services/customers.service';
import { Customers } from '../../../models/customers.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-customers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './update-customers.component.html',
  styleUrl: './update-customers.component.css'
})
export class UpdateCustomersComponent implements OnInit{
  customerForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedCustomer!: Customers;
  id!: number;
  selectedImage: File | undefined;
  imageError: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.customerService.getCustomer(this.id).subscribe(customer => {
      this.selectedCustomer = customer;
      this.customerForm.patchValue({
        code: customer.code,
        name: customer.name,
        phone: customer.phone,
        address: customer.address
      });
    });
  }

  onSubmit(){
    if(this.customerForm.valid && this.selectedImage){
      this.customerService.updateCustomer(this.selectedCustomer.id, this.customerForm.value, this.selectedImage).subscribe( response => {
          console.log('Customer updated successfully', response);
        })

        this.snackbar.open('Customer updated successfully', 'Close', {
          duration: 3000,
          panelClass:['bg-success', 'text-white'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

        this.router.navigateByUrl('/customer/list',{ replaceUrl:true});
    }else{
      console.log('Invalid input, please recheck the form');

      this.snackbar.open('Invalid input, please recheck the form', 'Close', {
        duration: 3000,
        panelClass:['bg-danger', 'text-white'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
