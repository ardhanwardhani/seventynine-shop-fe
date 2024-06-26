import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { Customers } from '../../../models/customers.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-detail-customers',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './detail-customers.component.html',
  styleUrl: './detail-customers.component.css'
})
export class DetailCustomersComponent implements OnInit{
  selectedCustomer!: Customers;
  id!: number;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private customerService: CustomersService,
  ){}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.customerService.getCustomer(this.id).subscribe(customer => {
      this.selectedCustomer = customer;
      console.log(customer);
    });
  }

  backToHome(){
    this.router.navigate(['/customer/list']);
  }

  editCustomer(customer: any) {
    this.router.navigateByUrl(`/customer/${customer.id}/edit`);
  }
}