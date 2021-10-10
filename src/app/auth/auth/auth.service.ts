import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators"
import { Subject, throwError } from "rxjs"
import { User } from "./user.model"




interface AuthResponseData{
    expIn: string,
    message: string,
    token: string
}

@Injectable({providedIn: 'root'})
export class AuthService{


    user = new Subject<User>()

    constructor(private http: HttpClient) {}

    signup(userData: {name: string, pass: string}){
        
       return this.http.post('http://localhost:8080/signup',{
            name: userData.name,
            pass: userData.pass
        })
    }

    login(userData: {name: string, pass: string}){
        
        return this.http.post<AuthResponseData>('http://localhost:8080/login',{
            name: userData.name,
            pass: userData.pass
        }).pipe(
            catchError(receivedError =>{
            let error = `the error received is ${receivedError}`
            return throwError(error)
            }), 
            tap(data=> { 
                const expDate = data.expIn
                const token = data.token
                const user = new User(userData.name, token, expDate)
                
                //emit the constructed user with his token
                this.user.next(user)
            })
        )
    }
    logout(){
        this.user.next(null)
    }

}