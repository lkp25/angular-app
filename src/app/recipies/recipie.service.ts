import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Recipie } from '../recipies/recipe-model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipieService{
    recipiesChanged = new Subject<Recipie[]>()
    recipieSelected = new Subject<Recipie>()
    
    private  recipies: Recipie[] = [
        // new Recipie(
        //     "sznitzel", 
        //     'dsadsadsadsadsadsadad', 
        //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS06q-hmeYAq1TfsTBYFAtLDevYpKYQuoyM_w&usqp=CAU",
        //     [
        //         new Ingredient('shznitzel', 2)
        //     ]
        //     ),
        // new Recipie(
        //     "dfdsfsdfde", 
        //     'dsadaaaaaaaaaaaaAAAAAAAadad', 
        //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS06q-hmeYAq1TfsTBYFAtLDevYpKYQuoyM_w&usqp=CAU",
        //     [
        //         new Ingredient('french fries', 20),
        //         new Ingredient('bread', 1)
        //     ]
        //     )
    ]

    constructor(
        private slService: ShoppingListService,
        private router: Router
        ){}
    loadRecipiesFromServer(recipies){
        this.recipies = recipies
        this.recipiesChanged.next(this.recipies.slice())
    }

    getRecipies(){
        return this.recipies.slice() //return a copy
    }
    getRecipie(id:number){
        return this.recipies[id]
    }
    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients)
    }

    addRecipie(recipie: Recipie){
        this.recipies.push(recipie)
        //return updated copy!
        this.recipiesChanged.next(this.recipies.slice())
    }
    updateRecipie(index: number, newRecipie: Recipie){
        this.recipies[index].name = newRecipie.name
        this.recipies[index].description = newRecipie.description
        this.recipies[index].imagePath = newRecipie.imagePath
        console.log(this.recipies[index].ingredients);
        
        this.recipies[index].ingredients.forEach((ingredient, index) =>{
            // console.log(ingredient.name);
            
            ingredient.name = newRecipie.ingredients[index].name
            ingredient.amount = newRecipie.ingredients[index].amount
        }) 
        this.recipiesChanged.next(this.recipies.slice())
    }
    deleteRecipie(id: number){
        this.recipies.splice(id, 1)
        this.recipiesChanged.next(this.recipies.slice())
        this.router.navigate(['/recipies'])
    }
}