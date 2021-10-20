import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



const appRoutes: Routes = [
    {path: '', redirectTo: '/recipies', pathMatch: 'full'},
    {
        path: 'recipies', 
        loadChildren: ()=> import('./recipies/recipies.module')
        .then(module => module.RecipiesModule)
    },
    
    {
        path: 'auth', 
        loadChildren: ()=> import('./auth/auth/auth.module')
        .then(module => module.AuthModule)
    },
    
    {
        path: 'shopping-list', 
        loadChildren: ()=> import('./shopping-list/shopping-list.module')
        .then(module => module.ShoppingListModule)
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