import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ItemsService } from '../../../services/items.service';
import { Items } from '../../../models/items.model';

@Component({
  selector: 'app-update-items',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-items.component.html',
  styleUrl: './update-items.component.css'
})
export class UpdateItemsComponent implements OnInit {
  itemForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedItem!: Items;
  id!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  )
  {
    this.itemForm = this.fb.group({
      code:['', Validators.required],
      name:['', Validators.required],
      stock:['', Validators.required],
      price:['', Validators.required],
      isAvailable:[true]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.itemService.getItem(this.id).subscribe(item => {
      this.selectedItem = item;
      this.itemForm.patchValue({
        code: item.code,
        name: item.name,
        price: item.price,
        stock: item.stock,
        isAvailable: item.isAvailable || true
      });
    });
  }

  onSubmit(){
    if(this.itemForm.valid){
      console.log(this.itemForm.value);
      this.itemService.updateItem(this.selectedItem.id, this.itemForm.value).subscribe( response => {
          console.log('Customer updated successfully', response);
      });

      this.snackbar.open('Item updated successfully', 'Close', {
        duration: 3000,
        panelClass:['bg-success', 'text-white'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      this.router.navigateByUrl('/item/list',{ replaceUrl:true});
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
}
