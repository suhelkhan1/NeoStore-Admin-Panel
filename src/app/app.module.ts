import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

//Main app components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

//Admin Module and components
import { AdminModule } from './modules/admin/admin.module';
import { AdminComponent} from './modules/admin/admin.component';

//Main app routing
import { AppRoutingModule } from './app-routing.module';

//Custom services
import { AuthService } from './providers/auth/auth.service'

//Route Gaurds
import { AuthGuard } from './gaurds/auth.guard'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AdminModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
