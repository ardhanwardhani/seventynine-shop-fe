import { Routes } from '@angular/router';
import { CreateOrdersComponent } from './components/order/create-orders/create-orders.component';
import { DetailOrdersComponent } from './components/order/detail-orders/detail-orders.component';
import { ListOrdersComponent } from './components/order/list-orders/list-orders.component';
import { UpdateOrdersComponent } from './components/order/update-orders/update-orders.component';
import { ReportOrdersComponent } from './components/order/report-orders/report-orders.component';

import { CreateCustomersComponent } from './components/customer/create-customers/create-customers.component';
import { DetailCustomersComponent } from './components/customer/detail-customers/detail-customers.component';
import { UpdateCustomersComponent } from './components/customer/update-customers/update-customers.component';
import { ListCustomersComponent } from './components/customer/list-customers/list-customers.component';
import { ListDeactiveCustomersComponent } from './components/customer/list-deactive-customers/list-deactive-customers.component';

import { CreateItemsComponent } from './components/item/create-items/create-items.component';
import { DetailItemsComponent } from './components/item/detail-items/detail-items.component';
import { ListItemsComponent } from './components/item/list-items/list-items.component';
import { UpdateItemsComponent } from './components/item/update-items/update-items.component';
import { ListUnavailableItemsComponent } from './components/item/list-unavailable-items/list-unavailable-items.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    {
        path: 'order',
        children: [
            {path: 'list', component: ListOrdersComponent},
            {path: 'create', component: CreateOrdersComponent },
            {path: ':id/detail', component: DetailOrdersComponent},
            {path: ':id/edit', component: UpdateOrdersComponent},
            {path: 'report', component: ReportOrdersComponent}
        ],
    },
    {
        path: 'customer',
        children: [
            {path: 'list', component: ListCustomersComponent},
            {path: 'create', component: CreateCustomersComponent },
            {path: ':id/detail', component: DetailCustomersComponent},
            {path: ':id/edit', component: UpdateCustomersComponent},
            {path: 'deactive', component: ListDeactiveCustomersComponent}
        ],
    },
    {
        path: 'item',
        children: [
            {path: 'list', component: ListItemsComponent},
            {path: 'create', component: CreateItemsComponent },
            {path: ':id/detail', component: DetailItemsComponent},
            {path: ':id/edit', component: UpdateItemsComponent},
            {path: 'unavailable', component: ListUnavailableItemsComponent}
        ],
    },
];
