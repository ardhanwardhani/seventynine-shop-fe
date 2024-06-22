import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CustomersService } from '../../../services/customers.service';
import { ItemsService } from '../../../services/items.service';
import { OrdersService } from '../../../services/orders.service';
import { Customers } from '../../../models/customers.model';
import { Items } from '../../../models/items.model';

@Component({
  selector: 'app-create-orders',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './create-orders.component.html',
  styleUrls: ['./create-orders.component.css']
})

export class CreateOrdersComponent implements OnInit {
  customers: Customers[] = [];
  items: Items[] = [];
  selectedCustomer: Customers | null = null;
  orderItems: any[] = [];

  constructor(
    private customerService: CustomersService,
    private itemsService: ItemsService,
    private orderService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.getItems();
  }

  getCustomers(): void {
    this.customerService.getActiveCustomers().subscribe(response => {
      this.customers = response;
    });
  }

  getItems(): void {
    this.itemsService.getAllItems().subscribe(response => {
      this.items = response;
    });
  }

  onSelectCustomer(customerId: string): void {
    this.selectedCustomer = this.customers.find(customer => customer.id === parseInt(customerId, 10)) || null;
  }

  addItem(itemId: number): void {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      const existingItem = this.orderItems.find(orderItem => orderItem.itemId === itemId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.orderItems.push({ ...item, quantity: 1 });
      }
    }
  }

  incrementQuantity(index: number): void {
    this.orderItems[index].quantity += 1;
  }

  decrementQuantity(index: number): void {
    if (this.orderItems[index].quantity > 1) {
      this.orderItems[index].quantity -= 1;
    }
  }

  removeItem(index: number): void {
    this.orderItems.splice(index, 1);
  }

  clearItems(): void {
    this.orderItems = [];
  }

  calculateTotal(): number {
    return this.orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  submitOrder(): void {
  if (this.selectedCustomer && this.orderItems.length > 0) {
    // Map orderItems to match the server's expected structure
    const itemsPayload = this.orderItems.map(item => ({
      itemId: item.id,
      quantity: item.quantity
    }));

    // Create the payload object with customerId and items
    const payload = {
      customerId: this.selectedCustomer.id || 0, // Ensure customerId is 0 if selectedCustomer.id is falsy
      items: itemsPayload
    };

    const subscription = this.orderService.createOrder(payload).subscribe({
      next: response => {
        console.log('Order created successfully', response);
        this.router.navigateByUrl('order/list', {replaceUrl: true});
      },
      error: error => {
        console.error('Error creating order', error);
      }
    });

    // Optionally, you might want to unsubscribe when the component is destroyed
    // Make sure to import Subscription from 'rxjs' at the top

    // Assuming you have ngOnDestroy lifecycle hook in your component
    // ngOnDestroy(): void {
    //   subscription.unsubscribe();
    // }

  } else {
    console.error('Customer and items are required to create an order');
  }
}
}
