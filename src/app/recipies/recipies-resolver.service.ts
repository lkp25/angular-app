import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipie } from "./recipe-model";

// @Injectable({providedIn: 'root'})
// export class RecipieResolverService implements Resolve<Recipie[]>{

//     constructor(
//         private dataStorageService: DataStorageService
        
//     ){}

//     // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        
//     // }
// }