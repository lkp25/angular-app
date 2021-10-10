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
      let token: string
      this.authService.user.pipe(take(1))
      .subscribe(user =>{
        console.log(user);
        
        token = user.token
       
      })
      
      
      

      this.http.get<Recipie[]>('http://localhost:8080/get-all', 
      {
        headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
      })
      .subscribe(response => {
        console.log(response);

        //subscribe t the user Subject from authService to get token!
        //
        
        this.recipieService.loadRecipiesFromServer(response)
      })
    }
}
