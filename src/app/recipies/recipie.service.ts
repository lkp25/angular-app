import { EventEmitter } from '@angular/core';
import { Recipie } from '../recipies/recipe-model';

export class RecipieService{

    recipieSelected = new EventEmitter<Recipie>()
    
    private  recipies: Recipie[] = [
        new Recipie("a test recipie", 'dsadsadsadsadsadsadad', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS06q-hmeYAq1TfsTBYFAtLDevYpKYQuoyM_w&usqp=CAU"),
        new Recipie("dfdsfsdfde", 'dsadaaaaaaaaaaaaAAAAAAAadad', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS06q-hmeYAq1TfsTBYFAtLDevYpKYQuoyM_w&usqp=CAU")
    ]

    getRecipies(){
        return this.recipies.slice() //return a copy
    }
}