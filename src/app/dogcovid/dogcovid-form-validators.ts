import { FormArray, FormControl, FormGroup } from "@angular/forms";

export class DogcovidFormValidators{

    constructor(){}

    static minNumOfElements(control: FormGroup){
        const form = control
        const vaccinesArray = form.get('vaccines')
        if(vaccinesArray.value?.length < 2 && form.touched){                     
                     console.log(form.touched);
                     
            return {notEnoughVaccines: "You must apply minimum 2 vaccines!"}
        }
       
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
                        
            console.log(control.get('name').value);
            return {nameTooLong:"name too long for small dog"}
        }   
            return null
    }

    static czyMaKokardeGender(control: FormGroup){
        const dogForm = control
        const gender = control.get('gender')
        const kokarda = control.get('kokarda')

        if(kokarda.value === 'tak' && gender.value === "pjes"){
            
            return {kokardaError: "pies z kokarda?  nie moze byc!"}
        }

        return null
    }

    static mefedronNieDlaMalych(control: FormControl){
        const dogForm = control
        const size = dogForm.get('size')
        const vaccinesArray = dogForm.get('vaccines')
        if(size.value === 'small' 
        && vaccinesArray.value.find((vac)=>vac.name === "mefedron")){

            console.log(vaccinesArray);
            return {mefedronSmallDog: "mefedronu nie podaje sie malym psom"}
        }
        
        return null
    }

    
}