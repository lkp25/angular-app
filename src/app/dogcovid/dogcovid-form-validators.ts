import { FormArray, FormControl } from "@angular/forms";

export class DogcovidFormValidators{

    constructor(){}

    static minNumOfElements(control: FormArray){
        if(control.controls.length <= 2){
            return {notEnoughVaccines: "You must apply minimum 2 vaccines!"}
        }
        console.log(control);
        return null
    }
}