import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipiesComponent } from "./recipies/recipies.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipies'},
    {path: 'recipies', component: RecipiesComponent},
    {path: 'shopping-list', component: ShoppingListComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}