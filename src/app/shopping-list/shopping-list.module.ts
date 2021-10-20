import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRouterModule } from "./shopping-list-router.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [RouterModule, FormsModule,CommonModule, ReactiveFormsModule, ShoppingListRouterModule],
    exports:[]
})
export class ShoppingListModule{}