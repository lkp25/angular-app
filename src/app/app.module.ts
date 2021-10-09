import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { RecipieListComponent } from './recipies/recipie-list/recipie-list.component';
import { RecipieDetailComponent } from './recipies/recipie-detail/recipie-detail.component';
import { RecipieItemComponent } from './recipies/recipie-list/recipie-item/recipie-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/dropdown-directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app.routing-module';
import { RecipieStartComponent } from './recipies/recipie-start/recipie-start.component';
import { RecipieEditComponent } from './recipies/recipie-edit/recipie-edit.component';
import { RecipieService } from './recipies/recipie.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    DropdownDirective,
    AppComponent,
    HeaderComponent,
    RecipiesComponent,
    RecipieListComponent,
    RecipieDetailComponent,
    RecipieItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipieStartComponent,
    RecipieEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [ShoppingListService, RecipieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
