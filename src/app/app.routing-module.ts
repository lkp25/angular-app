import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes, UrlSerializer, UrlTree } from "@angular/router";
import { CanLoadAuthGuard } from "./canLoad.guard";
import { ChatComponent } from "./chat/chat.component";
import { CoursesComponent } from "./courses/courses.component";
import { CryptoComponent } from "./crypto/crypto.component";
import { CustomPreloadingStrategy } from "./custom-preloading-strategy";
import { DogcovidComponent } from "./dogcovid/dogcovid.component";
import { RxjsComponent } from "./rxjs/rxjs.component";



const appRoutes: Routes = [
    {path: '', redirectTo: '/recipies', pathMatch: 'full'},
    {
        path: 'recipies', 
        loadChildren: ()=> import('./recipies/recipies.module')
        .then(module => module.RecipiesModule),
        data: {
            preload: true
        }
    },
    
    {
        path: 'auth', 
        loadChildren: ()=> import('./auth/auth/auth.module')
        .then(module => module.AuthModule),
        data: {animation: "auth"},
    },

    {
        path: 'shopping-list', 
        loadChildren: ()=> import('./shopping-list/shopping-list.module')
        .then(module => module.ShoppingListModule),
        data: {animation: "sh"}
    },
    {
        path: 'crypto', 
        loadChildren: ()=> import('./crypto/crypto.module')
        .then(module => module.CryptoModule),
        data: {animation: "crypto"},
        component: CryptoComponent
    },
    {
        path: 'rxjs', 
        loadChildren: ()=> import('./rxjs/rxjs.module')
        .then(module => module.RxjsModule),
        component: RxjsComponent,
        data: {animation: "rxjs"},
        
        canLoad: [CanLoadAuthGuard]
    },
    {
        path: 'dogcovid', 
        loadChildren: ()=> import('./dogcovid/dogcovid.module')
        .then(module => module.DogcovidModule),
        data: {animation: "dogcovid"},
        component: DogcovidComponent
    },
    {
        path: 'courses', 
        loadChildren: ()=> import('./courses/courses.module')
        .then(module => module.CoursesModule),
        data: {animation: "courses"},
        component: CoursesComponent
    },
    {
        path: 'helpdesk-chat',
        component: ChatComponent,
        outlet: 'chat'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { 
            preloadingStrategy: CustomPreloadingStrategy, 
            initialNavigation: 'enabled',
            // enableTracing: false,
            // useHash: true,
            scrollPositionRestoration: "enabled",
            paramsInheritanceStrategy: "always",
            relativeLinkResolution: "corrected",
            malformedUriErrorHandler: 
            (error: URIError, urlSerializer:UrlSerializer, url: string): UrlTree=> {
                return urlSerializer.parse('/page-not-found')
            }
         })
    ],
    exports: [RouterModule],
    providers: [
        CanLoadAuthGuard, CustomPreloadingStrategy
    ]
})
export class AppRoutingModule{

}