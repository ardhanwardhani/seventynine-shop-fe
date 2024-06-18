import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CustomersService } from '../../../services/customers.service';


@Component({
  selector: 'app-create-customers',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-customers.component.html',
  styleUrl: './create-customers.component.css'
})
export class CreateCustomersComponent {
  customerForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router,
    private customerService: CustomersService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar)
  {
    this.customerForm = this.fb.group({
      name:['', Validators.required],
      phone:['', Validators.required],
      address:['', Validators.required],
      pic:[''],
      is_active:[true]
    });
  }

  onSubmit(){
    if(this.customerForm.valid){
      this.customerService.createCustomer(this.customerForm.value).subscribe( response => {
          console.log('Customer created successfully', response);
        })

        this.snackbar.open('Customer created successfully', 'Close', {
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
