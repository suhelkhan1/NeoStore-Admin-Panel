import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProductCategoryComponent } from './get-product-category.component';

describe('GetProductCategoryComponent', () => {
  let component: GetProductCategoryComponent;
  let fixture: ComponentFixture<GetProductCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetProductCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
