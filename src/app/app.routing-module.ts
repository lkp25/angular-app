import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



const appRoutes: Routes = [
    {path: '', redirectTo: '/recipies', pathMatch: 'full'},
    {
        path: 'recipies', 
        loadChildren: ()=> import('./recipies/recipies.module')
        .then(module => module.RecipiesModule)
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}