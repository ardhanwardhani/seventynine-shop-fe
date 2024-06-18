import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../../services/items.service';
import { Items } from '../../../models/items.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-items',
  standalone: true,
  imports: [],
  templateUrl: './detail-items.component.html',
  styleUrl: './detail-items.component.css'
})
export class DetailItemsComponent implements OnInit {
  id!: number;
  selectedItem!: Items;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private itemsService: ItemsService
  ){}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.itemsService.getItem(this.id).subscribe(item => {
      this.selectedItem = item;
    });
  }

  backToHome(){
    this.router.navigate(['/item/list']);
  }

  editItem(item: any) {
    this.router.navigateByUrl(`/item/${item.id}/edit`);
  }
}
