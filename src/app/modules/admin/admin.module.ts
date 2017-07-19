import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AgmCoreModule } from '@agm/core';
//3rd party modules
import { ToastModule, ToastOptions, Toast } from 'ng2-toastr/ng2-toastr' 
import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';

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

//Breadcrumbs
import { ContentHeaderComponent } from './components/shared/content-header/content-header.component';

//User related components
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { GetUserComponent } from './components/user/get-user/get-user.component';
import { GetUsersComponent } from './components/user/get-users/get-users.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component'


//Product Releted Components
import { GetProductsComponent } from './components/products/get-products/get-products.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { GetProductComponent } from './components/products/get-product/get-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';

//Product Category related components
import { AddProductCategoryComponent } from './components/product-categories/add-product-category/add-product-category.component';
import { GetProductCategoriesComponent } from './components/product-categories/get-product-categories/get-product-categories.component';
import { UpdateProductCategoryComponent } from './components/product-categories/update-product-category/update-product-category.component';
import { ViewProductCategoryComponent } from './components/product-categories/view-product-category/view-product-category.component'

//Fileupload component
import { FileUploadComponent } from './components/shared/file-upload/file-upload.component'

//Orders related  components
import { GetOrdersComponent } from './components/orders/get-orders/get-orders.component';
import { GetOrderComponent } from './components/orders/get-order/get-order.component';
import { UpdateOrderComponent } from './components/orders/update-order/update-order.component';

//Location component used by Angular Google Map Api
import { LocationComponent } from './components/location/location.component';

//Tokens
import { JQ_TOKEN } from './providers/jquery/jquery.service';

//User Services
import { UserService } from './providers/user/user.service';

//toastr service
import { CustomOption } from './providers/toastr/toastr.service'
declare let toastr: Toast

//Products Services
import { ProductService } from './providers/product/product.service';
import { EqualValidatorDirective } from './directives/equal-validator/equal-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIc9JPEx_28T-43HG6bK-CtB7Z2KmaY9o'
    })
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
    UpdateProductCategoryComponent,
    ViewProductCategoryComponent,
    jqxFileUploadComponent,
    GetProductComponent,
    UpdateProductComponent,
    GetOrdersComponent,
    GetOrderComponent,
    UpdateOrderComponent,
    GetUsersComponent,
    LocationComponent,
    EqualValidatorDirective
  ],
  providers:[
    UserService,
    ProductService,
    { provide: ToastOptions, useClass: CustomOption },
    { provide: JQ_TOKEN , useValue: jQuery}
  ],
  exports: [
    AdminComponent,
    EqualValidatorDirective
  ]
})
export class AdminModule { }
