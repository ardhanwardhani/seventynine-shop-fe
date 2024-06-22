import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnavailableItemsComponent } from './list-unavailable-items.component';

describe('ListUnavailableItemsComponent', () => {
  let component: ListUnavailableItemsComponent;
  let fixture: ComponentFixture<ListUnavailableItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUnavailableItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListUnavailableItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
