import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipieDetailComponent } from "./recipies/recipie-detail/recipie-detail.component";
import { RecipieStartComponent } from "./recipies/recipie-start/recipie-start.component";
import { RecipiesComponent } from "./recipies/recipies.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipies', pathMatch: 'full'},
    {path: 'recipies', component: RecipiesComponent, children: [
        {path: '', component: RecipieStartComponent},
        {path: ':id', component: RecipieDetailComponent},

    ]},
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