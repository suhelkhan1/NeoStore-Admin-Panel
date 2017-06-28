import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotfoundComponent } from  './components/shared/page-notfound/page-notfound.component'
import { AddUserComponent } from './components/user/add-user/add-user.component'
import { GetUserComponent } from './components/user/get-user/get-user.component'
import { UpdateUserComponent } from './components/user/update-user/update-user.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'admin', 
        component: AdminComponent,
        children: [
            { path:'', component: DashboardComponent},
            { path:'dashboard', component: DashboardComponent },
            { path:'adduser', component: AddUserComponent },
            { path:'getuser', component: GetUserComponent },
            { path:'updateuser/:id', component: UpdateUserComponent},
            { path:'404', component: PageNotfoundComponent },
            //{ path:'**', redirectTo:'404', pathMatch:'full'}
        ]
     }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
