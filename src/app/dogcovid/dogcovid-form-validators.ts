import { FormArray, FormControl, FormGroup } from "@angular/forms";

export class DogcovidFormValidators{

    constructor(){}

    static minNumOfElements(control: FormArray){
        if(control.controls.length < 2 && control.controls.length > 0 ){
            return {notEnoughVaccines: "You must apply minimum 2 vaccines!"}
        }
        console.log(control);
        return null
    }

    static maxNameLength(control: FormGroup){

        const dogForm = control
        const nameControl = control.get('name')
        const sizeControl = control.get('size')
        if(nameControl.value?.length > 10){    
            return {nameTooLong:"name too long"}
        }
        if(nameControl.value?.length > 5 && sizeControl.value == 'small'){
            // console.log(control.parent.get('size').value);
            // if(dogForm.get('name').errors)
            // console.log((control.parent.get('name').errors));
            // console.log(Object.values(control.parent.get('name').errors));
            
            console.log(control.get('name').value);
            return {nameTooLongSmallDog:"name too long for small dog"}
        }   
            return null
    }

    
}