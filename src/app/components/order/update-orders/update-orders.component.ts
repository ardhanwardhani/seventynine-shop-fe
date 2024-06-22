import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { OrdersService } from '../../../services/orders.service';
import { Orders, OrdersRequest, OrderItemResponse, OrderItemRequest} from '../../../models/orders.model';

@Component({
  selector: 'app-update-orders',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './update-orders.component.html',
  styleUrl: './update-orders.component.css'
})
export class UpdateOrdersComponent implements OnInit{
  order: any = {};
  orderItemsResponse: OrderItemResponse[] = [];
  orderItemRequest: OrderItemRequest[] = [];
  errorMessage: string = '';

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getOrder(id);
  }

  getOrder(id: number): void {
    this.ordersService.getOrder(id).subscribe({
      next: (data) => {
        this.order = data;
        this.orderItemsResponse = data.orderItems.map((item: any) => ({
          orderItemId: item.orderItemId,
          itemId: item.itemId,
          itemCode: item.itemCode,
          itemName: item.itemName,
          price: item.price,
          quantity: item.quantity
        }));
      },
      error: (err) => this.errorMessage = err
    });
  }

  incrementQuantity(index: number): void {
    this.orderItemsResponse[index].quantity += 1;
  }

  decrementQuantity(index: number): void {
    if (this.orderItemsResponse[index].quantity > 1) {
      this.orderItemsResponse[index].quantity -= 1;
    }
  }

  removeItem(index: number): void {
    this.orderItemsResponse.splice(index, 1);
  }

  clearItems(): void {
    this.orderItemsResponse = [];
  }

  calculateTotal(): number {
    return this.orderItemsResponse.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  submitOrder(): void {
    if (this.order) {
      const updateOrder: OrdersRequest = {
        customerId: this.order.customerId,
        items: this.orderItemsResponse.map(item => ({
          itemId: item.itemId,
          quantity: item.quantity
        }))
      };

      this.ordersService.updateOrder(this.order.orderId, updateOrder).subscribe({
        next: () => this.router.navigate(['/order/list']),
        error: (err) => this.errorMessage = err
      });
    }
  }
}
