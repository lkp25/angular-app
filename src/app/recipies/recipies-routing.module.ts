import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from '../auth/auth/auth.guard';
import { RecipieDetailComponent } from "./recipie-detail/recipie-detail.component";
import { RecipieEditComponent } from "./recipie-edit/recipie-edit.component";
import { RecipieStartComponent } from "./recipie-start/recipie-start.component";
import { RecipiesComponent } from "./recipies.component";

const routes: Routes = [{
    path: '', component: RecipiesComponent, 
    canActivate: [AuthGuard],
    children: [
        {path: '', component: RecipieStartComponent},
        {path: 'new', component: RecipieEditComponent},
        {path: ':id', component: RecipieDetailComponent},
        {path: ':id/edit', component: RecipieEditComponent},

    ],
}]
@NgModule({
 imports: [
     RouterModule.forChild(routes)
 ], 
 exports: [RouterModule]
})
export class RecipiesRoutingModule{}