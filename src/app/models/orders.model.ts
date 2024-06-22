export interface OrderItemResponse {
    orderItemId: number;
    itemId: number;
    itemCode: String;
    itemName: String;
    price: number;
    quantity: number;
}

export interface OrderItemRequest {
    itemId: number;
    quantity: number;
}
  
export interface Orders {
    customerId: number;
    items: OrderItemResponse[];
}

export interface OrdersRequest {
    customerId: number;
    items: OrderItemRequest[];
}
  