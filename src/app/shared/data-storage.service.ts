import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipie } from '../recipies/recipe-model';
import { RecipieService } from '../recipies/recipie.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipieService: RecipieService
    ) { }

    recipies = this.recipieService.getRecipies()


    storeRecipies(){
      console.log(this.recipies);
      const body = {
         recipies: this.recipies
      }
      this.http.post('http://localhost:8080/save-all', body).subscribe(response => {
        console.log(response);
        
      })
    }

    getAllRecipes(){
      this.http.get<Recipie[]>('http://localhost:8080/get-all').subscribe(response => {
        console.log(response);
        this.recipieService.loadRecipiesFromServer(response)
      })
    }
}
