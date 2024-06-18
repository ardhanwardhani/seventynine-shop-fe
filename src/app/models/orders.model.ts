// src/app/models/orders.model.ts
export interface Item {
    itemId: number;
    quantity: number;
}
  
export interface Orders {
    customerId: number;
    items: Item[];
}
  