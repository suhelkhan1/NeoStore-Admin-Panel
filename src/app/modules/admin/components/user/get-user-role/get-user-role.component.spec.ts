import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserRoleComponent } from './get-user-role.component';

describe('GetUserRoleComponent', () => {
  let component: GetUserRoleComponent;
  let fixture: ComponentFixture<GetUserRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetUserRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
