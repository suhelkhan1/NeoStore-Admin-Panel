import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCartsComponent } from './get-carts.component';

describe('GetCartsComponent', () => {
  let component: GetCartsComponent;
  let fixture: ComponentFixture<GetCartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
