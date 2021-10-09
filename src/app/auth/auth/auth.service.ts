import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


interface AuthResponseData{
    message: string,
    token: string
}

@Injectable({providedIn: 'root'})
export class AuthService{

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
        })
    }

}