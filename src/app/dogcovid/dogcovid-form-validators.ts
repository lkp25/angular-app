import { FormArray, FormControl } from "@angular/forms";

export class DogcovidFormValidators{

    constructor(){}

    static minNumOfElements(control: FormArray){
        if(control.controls.length < 2 && control.controls.length > 0 ){
            return {notEnoughVaccines: "You must apply minimum 2 vaccines!"}
        }
        console.log(control);
        return null
    }

    static maxNameLength(control: FormControl){
        if(control.value?.length > 10){    
            return {nameTooLong:"name too long"}
        }
        if(control.value?.length > 5 && control.parent.get('size').value == 'small'){
            console.log(control.parent.get('size').value);
            
            return {nameTooLongSmallDog:"name too long for small dog"}
            
        }

        return null
    }
}