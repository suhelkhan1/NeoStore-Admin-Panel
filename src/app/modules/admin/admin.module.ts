import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent, 
    MainSideComponent, 
    MainHeaderComponent, 
    FooterComponent,
    DashboardComponent,
    PageNotfoundComponent,
    ContentHeaderComponent
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
