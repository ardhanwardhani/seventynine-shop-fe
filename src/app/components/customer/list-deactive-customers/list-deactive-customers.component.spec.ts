import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeactiveCustomersComponent } from './list-deactive-customers.component';

describe('ListDeactiveCustomersComponent', () => {
  let component: ListDeactiveCustomersComponent;
  let fixture: ComponentFixture<ListDeactiveCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDeactiveCustomersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDeactiveCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
