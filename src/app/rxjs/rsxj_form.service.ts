import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Injectable({providedIn: 'root'})
export class RxjsFormService{
    
    constructor(private http: HttpClient){}


    getev(){
        return this.http.get('https://jsonplaceholder.typicode.com/todos')
    }
}
