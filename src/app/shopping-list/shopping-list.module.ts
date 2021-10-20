import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRouterModule } from "./shopping-list-router.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [RouterModule, FormsModule, SharedModule, ReactiveFormsModule, ShoppingListRouterModule],
   
})
export class ShoppingListModule{}