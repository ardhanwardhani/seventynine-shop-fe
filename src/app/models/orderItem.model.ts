export interface OrderItem {
    orderItemId: number;
    itemCode: string;
    itemName: string;
    quantity: number;
}

export interface Order {
    orderId: number;
    orderCode: string;
    orderDate: Date;
    customerId: number;
    customerName: string;
    orderItems: OrderItem[];
  }