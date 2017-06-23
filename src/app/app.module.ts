import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
