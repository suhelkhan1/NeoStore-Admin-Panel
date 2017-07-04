import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FileUploadModule } from 'ng2-file-upload'
import { ToastModule, ToastOptions, Toast } from 'ng2-toastr/ng2-toastr' 

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
import { GetUserRoleComponent } from './components/user/get-user-role/get-user-role.component';
import { AddUserRoleComponent } from './components/user/add-user-role/add-user-role.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component'
import { FileUploadComponent } from './components/shared/file-upload/file-upload.component'
import { GetProductsComponent } from './components/products/get-products/get-products.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { AddProductCategoryComponent } from './components/product-categories/add-product-category/add-product-category.component';
import { GetProductCategoriesComponent } from './components/product-categories/get-product-categories/get-product-categories.component';
import { UpdateProductCategoryComponent } from './components/product-categories/update-product-category/update-product-category.component';
import { ViewProductCategoryComponent } from './components/product-categories/view-product-category/view-product-category.component'

//Tokens
import { JQ_TOKEN } from './providers/jquery/jquery.service';

//User Services
import { UserService } from './providers/user/user.service';

//toastr service
import { CustomOption } from './providers/toastr/toastr.service'
declare let toastr: Toast

//Products Services
import { ProductService } from './providers/product/product.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule
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
    GetProductCategoriesComponent,
    GetUserRoleComponent,
    AddUserRoleComponent,
    UpdateProductCategoryComponent,
    ViewProductCategoryComponent
  ],
  providers:[
    UserService,
    ProductService,
    { provide: ToastOptions, useClass: CustomOption },
    { provide: JQ_TOKEN , useValue: jQuery}
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
