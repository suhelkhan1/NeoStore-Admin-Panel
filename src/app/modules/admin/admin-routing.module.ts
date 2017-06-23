import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotfoundComponent } from  './components/shared/page-notfound/page-notfound.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'admin', 
        component: AdminComponent,
        children: [
            { path:'', component: DashboardComponent},
            { path:'dashboard', component: DashboardComponent },
            { path:'404', component: PageNotfoundComponent },
            { path:'**', redirectTo:'404', pathMatch:'full'}
        ]
     }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
