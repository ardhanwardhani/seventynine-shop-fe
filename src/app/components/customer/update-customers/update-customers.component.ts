import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CustomersService } from '../../../services/customers.service';
import { Customers } from '../../../models/customers.model';


@Component({
  selector: 'app-update-customers',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-customers.component.html',
  styleUrl: './update-customers.component.css'
})
export class UpdateCustomersComponent implements OnInit{
  customerForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedCustomer!: Customers;
  id!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomersService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  )
  {
    this.customerForm = this.fb.group({
      code:['', Validators.required],
      name:['', Validators.required],
      phone:['', Validators.required],
      address:['', Validators.required],
      pic:[''],
      is_active:[true]
    });
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
    if(this.customerForm.valid){
      this.customerService.updateCustomer(this.selectedCustomer.id, this.customerForm.value).subscribe( response => {
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

  backToHome(){
    this.router.navigate(['/customer/list']);
  }
}
