import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators'

// DONT ADD THE PROVIDEDIN ROOT!
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token: string
    this.authService.user.pipe(take(1))
    .subscribe(user =>{
    console.log(user);        
      token = user.token       
    })     
    //no token present -eg. before login - just return original request
    if(!token){
        console.log("request without user credentials");
        
        return next.handle(req)
    }
    //token present - add the auth header with token inside
    const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
    console.log('user credentials present - auth header contains token')
    // headers.append('Authorization', `Bearer ${token}`)
    return next.handle(modifiedReq);
  }
}
