import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login/login.component';
import { appInitializer } from './helpers/app.initializer';
import { AuthenticationService } from './services/authentication.service';
import { JwtInterceptor } from './helpers/jwt.interceptor.service';
import { ErrorInterceptor } from './helpers/error.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TasksComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
