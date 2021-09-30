import { appendFile } from "fs"
import { Ingredient } from "../shared/ingredient.model"

export class Recipie{
    public name: string
    public description: string
    public imagePath: string
    public ingredients: Ingredient[]

    constructor(name: string, desc:string, image:string, ingredients: Ingredient[]){
        this.name = name
        this.description = desc
        this.imagePath = image
        this.ingredients = ingredients
    }
}
