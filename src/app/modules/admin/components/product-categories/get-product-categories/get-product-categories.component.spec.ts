import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProductCategoriesComponent } from './get-product-categories.component';

describe('GetProductCategoriesComponent', () => {
  let component: GetProductCategoriesComponent;
  let fixture: ComponentFixture<GetProductCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetProductCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetProductCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
