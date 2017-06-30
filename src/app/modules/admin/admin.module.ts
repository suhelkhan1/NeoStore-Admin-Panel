import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { FileUploadModule } from 'ng2-file-upload'
 

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

//Other Components
import { ContentHeaderComponent } from './components/shared/content-header/content-header.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { GetUserComponent } from './components/user/get-user/get-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component'
import { GetProductsComponent } from './components/products/get-products/get-products.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { FileUploadComponent } from './components/shared/file-upload/file-upload.component'

//Tokens
import { JQ_TOKEN } from './providers/jquery/jquery.service';
//export declare const jQuery: Object;

//User Services
import { UserService } from './providers/user/user.service';

//Products Services
import { ProductService } from './providers/product/product.service';
import { AddProductCategoryComponent } from './components/products/add-product-category/add-product-category.component';
import { GetProductCategoryComponent } from './components/products/get-product-category/get-product-category.component'

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
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
    AddProductComponent,
    FileUploadComponent,
    AddProductCategoryComponent,
    GetProductCategoryComponent
  ],
  providers:[
    UserService,
    ProductService,
    { provide: JQ_TOKEN , useValue: jQuery}
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
