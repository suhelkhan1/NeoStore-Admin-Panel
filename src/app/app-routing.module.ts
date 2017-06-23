import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './modules/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}