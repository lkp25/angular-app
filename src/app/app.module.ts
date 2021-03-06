import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app.routing-module';
import { RecipieService } from './recipies/recipie.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './auth/auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidDirective } from './shared/valid.directive';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [    
    AppComponent,
    HeaderComponent,
    LoadingComponent
    

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),    
    AppRoutingModule,   
    HttpClientModule,    
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    ShoppingListService,
    RecipieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
