import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { CanLoad, Router, Route, UrlSegment } from "@angular/router";

import { Observable } from "rxjs";
import { first, tap } from "rxjs/operators";
import { AuthService } from "./auth/auth/auth.service";

@Injectable()
export class CanLoadAuthGuard implements CanLoad{
    constructor(private auth:AuthService, private router: Router){}

    //returning an observable carrying a boolean for the router to process:
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
        //long running observable needs to complete for the guard to work:
        //apply first operator tocloase stream after first value received
        return this.auth.isLoggedIn$.pipe(
            first(),
            tap(loggedIn => {
                if(!loggedIn){
                    this.router.navigateByUrl('/auth')
                }
            })
        )
    }

}