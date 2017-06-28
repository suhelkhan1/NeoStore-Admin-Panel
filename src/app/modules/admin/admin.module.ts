import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

//Custom created components
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

//Navbar, Sidebar and footbar shared components
import { MainSideComponent } from './components/shared/main-side/main-side.component';
import { MainHeaderComponent } from './components/shared/main-header/main-header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PageNotfoundComponent } from './components/shared/page-notfound/page-notfound.component';

//Admin Routes
import { AdminRoutingModule } from './admin-routing.module';
import { ContentHeaderComponent } from './components/shared/content-header/content-header.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { GetUserComponent } from './components/user/get-user/get-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component'

//Tokens
import { JQ_TOKEN } from './providers/jquery/jquery.service';
//export declare const jQuery: Object;

//User Services
import { UserService } from './providers/user/user.service';
import { GetProductsComponent } from './components/products/get-products/get-products.component';
import { AddProductComponent } from './components/products/add-product/add-product.component'

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  declarations: [
    AdminComponent, 
    MainSideComponent, 
    MainHeaderComponent, 
    FooterComponent,
    DashboardComponent,
    PageNotfoundComponent,
    ContentHeaderComponent,
    AddUserComponent,
    GetUserComponent,
    UpdateUserComponent,
    GetProductsComponent,
    AddProductComponent
  ],
  providers:[
    UserService,
    { provide: JQ_TOKEN , useValue: jQuery}
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
