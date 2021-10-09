import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService{

    constructor(private http: HttpClient) {}
    signup(userData: {name: string, pass: string}){
        
        this.http.post('http://localhost:8080/signup',{
            name: userData.name,
            pass: userData.pass
        }).subscribe(ans => console.log(ans)
        
        )
    }
    login(userData: {name: string, pass: string}){
        
        this.http.post('http://localhost:8080/login',{
            name: userData.name,
            pass: userData.pass
        }).subscribe(ans => console.log(ans)
        
        )
    }

}