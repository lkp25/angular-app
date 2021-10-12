import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth/auth.service';
import { Recipie } from '../recipies/recipe-model';
import { RecipieService } from '../recipies/recipie.service';
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipieService: RecipieService,
    private authService: AuthService
    ) { }

    recipies = this.recipieService.getRecipies()
    
    

    storeRecipies(){
      console.log(this.recipieService.getRecipies());
      const body = {
         recipies: this.recipieService.getRecipies()
      }
      this.http.post('http://localhost:8080/save-all', body).subscribe(response => {
        console.log(response);
        
      })
    }

    getAllRecipes(){
      // get the valid token first from auth service IF PRESENT!
      // it is stored in user Subject so 1 time subscribtion is necessary:
      let token: string
      this.authService.user.pipe(take(1))
      .subscribe(user =>{
        console.log(user);   
        //HERE we call the token which will be set to null if it expired,
        // as stated in User model - user.token is a getter function  
        token = user.token       
      })      

      // with the token aquired, send a request attaching it as auth header.
      this.http.get<Recipie[]>('http://localhost:8080/get-all', 
      {
        headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
      })
      //subscribe to the response and forward it on success to the recipieService:
      .subscribe(response => {
        console.log(response);
        
        this.recipieService.loadRecipiesFromServer(response)
      })
    }
}
