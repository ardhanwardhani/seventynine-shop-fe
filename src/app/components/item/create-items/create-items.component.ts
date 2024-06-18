import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { ItemsService } from '../../../services/items.service';

@Component({
  selector: 'app-create-items',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-items.component.html',
  styleUrl: './create-items.component.css'
})

export class CreateItemsComponent {
  itemForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router , private itemService: ItemsService, private fb: FormBuilder, private snackbar: MatSnackBar){
    this.itemForm = this.fb.group({
      name:['', Validators.required],
      stock:['', Validators.required],
      price:['', Validators.required],
      status:['', Validators.required]
    });
  }

  onSubmit(){
    if(this.itemForm.valid){
      this.itemService.createItem(this.itemForm.value).subscribe( response => {
        console.log('Item created successfully', response);
      })

      this.snackbar.open('Item created successfully', 'Close', {
        duration: 3000,
        panelClass: ['bg-success', 'text-white'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });

      this.router.navigateByUrl('/item/list', { replaceUrl:true});
    }else{
      console.log('Invalid input, please recheck the form.');

      this.snackbar.open('Invalid input, please recheck the form.', 'Close', {
        duration: 3000,
        panelClass: ['bg-danger', 'text-white'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
