import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../../services/orders.service';
import { Order } from '../../../models/orderItem.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-orders.component.html',
  styleUrls: ['./detail-orders.component.css']
})
export class DetailOrdersComponent implements OnInit {
  order!: Order;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getOrder(id);
  }

  getOrder(id: number): void {
    this.ordersService.getOrder(id).subscribe({
      next: (data) => this.order = data,
      error: (err) => this.errorMessage = err
    });
  }

  backToHome(){
    this.router.navigate(['/order/list']);
  }

  editItem(order: any) {
    this.router.navigateByUrl(`/order/${order.orderId}/edit`);
  }
}
