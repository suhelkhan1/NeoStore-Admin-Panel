import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotfoundComponent } from  './components/shared/page-notfound/page-notfound.component'

import { GetUsersComponent } from './components/user/get-users/get-users.component'
import { GetUserComponent } from './components/user/get-user/get-user.component'
import { AddUserComponent } from './components/user/add-user/add-user.component'
import { UpdateUserComponent } from './components/user/update-user/update-user.component'

//Products related components
import { AddProductComponent } from './components/products/add-product/add-product.component'
import { GetProductsComponent } from './components/products/get-products/get-products.component'
import { GetProductComponent } from './components/products/get-product/get-product.component'
import { UpdateProductComponent } from './components/products/update-product/update-product.component'

import { AddProductCategoryComponent } from './components/product-categories/add-product-category/add-product-category.component'
import { GetProductCategoriesComponent } from './components/product-categories/get-product-categories/get-product-categories.component'
import { UpdateProductCategoryComponent } from './components/product-categories/update-product-category/update-product-category.component'
import { ViewProductCategoryComponent } from './components/product-categories/view-product-category/view-product-category.component'

//Orders components
import { GetOrdersComponent } from './components/orders/get-orders/get-orders.component';
import { GetOrderComponent } from './components/orders/get-order/get-order.component';
import { UpdateOrderComponent } from './components/orders/update-order/update-order.component';

import { AuthGuard } from '../../gaurds/auth.guard'

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'admin', 
        component: AdminComponent,
        data: { breadcrumb : 'Admin'},
        canActivate:[AuthGuard], 
        children: [{
          path: '',
          canActivateChild: [AuthGuard],
          children:[
            { path:'', component: DashboardComponent },
            { path:'dashboard', component: DashboardComponent, data: { breadcrumb : 'Dashboard'}},
            { path:'adduser', component: AddUserComponent, data: { breadcrumb : 'Add User'} },
            { path:'getusers', component: GetUsersComponent, data: { breadcrumb : 'List of Users'} },
            { path:'getuser/:id', component: GetUserComponent, data: { breadcrumb : 'User Info'} },
            { path:'updateuser/:id', component: UpdateUserComponent, data: { breadcrumb : 'Update User'}},
            
            { path:'addproduct', component: AddProductComponent, data: { breadcrumb : 'Add product'} },
            { path:'getproducts', component: GetProductsComponent, data: { breadcrumb : 'List of Products'} },
            { path:'getproduct/:id', component: GetProductComponent, data: { breadcrumb : 'Product Info'} },
            { path:'updateproduct/:id', component: UpdateProductComponent, data: { breadcrumb : 'Update Product'} },

            { path:'addprductcategory', component: AddProductCategoryComponent, data: { breadcrumb : 'Add Product Category'} },
            { path:'getproductcategories', component: GetProductCategoriesComponent, data: { breadcrumb : 'List of Product Categories'} },
            { path:'updateproductcategory/:id', component: UpdateProductCategoryComponent, data: { breadcrumb : 'Update Product Category'} },
            { path:'viewproductcategory/:id', component: ViewProductCategoryComponent, data: { breadcrumb : 'Product Category Info'} },

            { path:'getorders', component: GetOrdersComponent, data: { breadcrumb : 'List od Orders'} },
            { path:'getorder/:id', component: GetOrderComponent, data: { breadcrumb : 'Order'} },
            { path:'updateorder', component: UpdateOrderComponent, data: { breadcrumb : 'Update Order'} },
            { path:'404', component: PageNotfoundComponent, data: { breadcrumb : '404'} },
            //{ path:'**', redirectTo:'404', pathMatch:'full'}
          ]
        }]
     }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
