import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy{
    //called on every route nav transition
    preload(route: Route, load: () => Observable<any>): Observable<any>{
        //if module is configured in router to have data.preload = true,
        //return an observable containing this module. else retrun null obs.
        if(route.data['preload']){
           return load()
        } else {
            return of(null)
        }
        
    }
}