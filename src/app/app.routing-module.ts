import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { CanLoadAuthGuard } from "./canLoad.guard";
import { CoursesComponent } from "./courses/courses.component";
import { CryptoComponent } from "./crypto/crypto.component";
import { DogcovidComponent } from "./dogcovid/dogcovid.component";
import { RxjsComponent } from "./rxjs/rxjs.component";



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
    },
    {
        path: 'crypto', 
        loadChildren: ()=> import('./crypto/crypto.module')
        .then(module => module.CryptoModule),
        component: CryptoComponent
    },
    {
        path: 'rxjs', 
        loadChildren: ()=> import('./rxjs/rxjs.module')
        .then(module => module.RxjsModule),
        component: RxjsComponent,
        canLoad: [CanLoadAuthGuard]
    },
    {
        path: 'dogcovid', 
        loadChildren: ()=> import('./dogcovid/dogcovid.module')
        .then(module => module.DogcovidModule),
        component: DogcovidComponent
    },
    {
        path: 'courses', 
        loadChildren: ()=> import('./courses/courses.module')
        .then(module => module.CoursesModule),
        component: CoursesComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })
    ],
    exports: [RouterModule],
    providers: [
        CanLoadAuthGuard
    ]
})
export class AppRoutingModule{

}