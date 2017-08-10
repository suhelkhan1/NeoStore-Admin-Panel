/*+-+-+-+-+-+-+-+-+- Modules +-+-+-+-+-+-+-+-+- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AgmCoreModule } from '@agm/core';

//3rd party modules
import { ToastModule, ToastOptions, Toast } from 'ng2-toastr/ng2-toastr' 
import { jqxFileUploadComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxfileupload';


/*+-+-+-+-+-+-+-+-+- Components +-+-+-+-+-+-+-+-+- */
//Main Admin component
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

//Navbar, Sidebar and footbar shared components
import { MainSideComponent } from './components/shared/main-side/main-side.component';
import { MainHeaderComponent } from './components/shared/main-header/main-header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PageNotfoundComponent } from './components/shared/page-notfound/page-notfound.component';

//Breadcrumbs
import { ContentHeaderComponent } from './components/shared/content-header/content-header.component';

//User components
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { GetUserComponent } from './components/user/get-user/get-user.component';
import { GetUsersComponent } from './components/user/get-users/get-users.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component'

//Product Components
import { GetProductsComponent } from './components/products/get-products/get-products.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { GetProductComponent } from './components/products/get-product/get-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';

//Product Category components
import { AddProductCategoryComponent } from './components/product-categories/add-product-category/add-product-category.component';
import { GetProductCategoriesComponent } from './components/product-categories/get-product-categories/get-product-categories.component';
import { UpdateProductCategoryComponent } from './components/product-categories/update-product-category/update-product-category.component';
import { ViewProductCategoryComponent } from './components/product-categories/view-product-category/view-product-category.component'

//Fileupload component
import { FileUploadComponent } from './components/shared/file-upload/file-upload.component'

//Orders components
import { GetOrdersComponent } from './components/orders/get-orders/get-orders.component';
import { GetOrderComponent } from './components/orders/get-order/get-order.component';
import { UpdateOrderComponent } from './components/orders/update-order/update-order.component';

//Cart Components
import { GetCartsComponent } from './components/cart/get-carts/get-carts.component';
import { GetCartComponent } from './components/cart/get-cart/get-cart.component';
import { UpdateCartComponent } from './components/cart/update-cart/update-cart.component';

//Location component used by Angular Google Map Api
import { LocationComponent } from './components/location/location.component';

/*+-+-+-+-+-+-+-+-+- Services +-+-+-+-+-+-+-+-+- */
import { JQ_TOKEN } from './providers/jquery/jquery.service'; //Tokens for jQuery
import { UserService } from './providers/user/user.service'; //User Services
import { ProductService } from './providers/product/product.service'; //Products Services
import { OrderService } from './providers/order/order.service'; //Orders service
import { ImageService } from './providers/image/image.service'; //Image Service
import { CartService } from './providers/cart/cart.service'; //Cart Service
import { ColorService } from './providers/color/color.service';
import { CustomOption } from './providers/toastr/toastr.service'; //toastr service
declare let toastr: Toast //Toaster variable

/*+-+-+-+-+-+-+-+-+- Routes +-+-+-+-+-+-+-+-+- */
import { AdminRoutingModule } from './admin-routing.module'; //Admin Routes

/*+-+-+-+-+-+-+-+-+- Directives +-+-+-+-+-+-+-+-+- */
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
    //Shared Components
    AdminComponent, 
    MainSideComponent, 
    MainHeaderComponent, 
    FooterComponent,
    DashboardComponent,
    PageNotfoundComponent,
    ContentHeaderComponent,

    //User Components
    GetUsersComponent,
    GetUserComponent,
    AddUserComponent,
    UpdateUserComponent,

    //Product Components
    GetProductsComponent,
    GetProductComponent,
    AddProductComponent,
    UpdateProductComponent,

    //Product Category Components
    GetProductCategoriesComponent,
    ViewProductCategoryComponent,
    AddProductCategoryComponent,
    UpdateProductCategoryComponent,
    
    //Orders Components
    GetOrdersComponent,
    GetOrderComponent,
    UpdateOrderComponent,

    //Carts Components
    GetCartsComponent,
    GetCartComponent,
    UpdateCartComponent,

    //File Upload Components
    FileUploadComponent,
    jqxFileUploadComponent,
    
    //Location Components
    LocationComponent,

    //Equal check validator directive
    EqualValidatorDirective,
  ],
  providers:[
    UserService,
    ProductService,
    ImageService,
    OrderService,
    CartService,
    ColorService,
    { provide: ToastOptions, useClass: CustomOption },
    { provide: JQ_TOKEN , useValue: jQuery}
  ],
  exports: [
    AdminComponent,
    EqualValidatorDirective
  ]
})
export class AdminModule { }
