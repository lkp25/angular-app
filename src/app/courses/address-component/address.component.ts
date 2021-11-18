import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder, FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {noop, Subscription} from 'rxjs';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-component.html',
  styleUrls: ['./address-component.scss'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          multi:true,
          useExisting: AddressFormComponent
      },
      {
        provide: NG_VALIDATORS,
        multi: true,
        useExisting: AddressFormComponent
      }
  ]
})
export class AddressFormComponent implements Validator, ControlValueAccessor, OnDestroy {

    //VALIDATOR METHODs:
  onValidatorChange = () => {}

  validate(control: AbstractControl):ValidationErrors | null {
      
    let errors
      for(let key in control.value){
          if(!control.value[key]){
            errors = {addressFormValid: false}
            return errors
          }
          
          
      }
      
        
    return null
  }
  //notifies parent form that change occured to the value so it can be validated again
  registerOnValidatorChange(onValidatorChange: ()=> void): void{
    this.onValidatorChange = onValidatorChange
  }
    @Input()
    legend:string;

    //paired with blur event on form fields in template
    onTouched = () => {};

    onChangeSub: Subscription;

    form: FormGroup = this.fb.group({
        addressLine1: [null, [Validators.required]],
        addressLine2: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        city: [null, [Validators.required]]
    });

    constructor(private fb: FormBuilder) {

    }

    //on change is a function that takes one argument, 
    // subscribe gives one argument - value - so it can be passed in shorthand:
    registerOnChange(onChange: any) {
        this.onChangeSub = this.form.valueChanges.subscribe(onChange);
    }

    ngOnDestroy() {
        this.onChangeSub.unsubscribe();
    }


    writeValue(value: any) {
        if (value) {
            this.form.setValue(value);
        }
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
    }

    setDisabledState(disabled:boolean) {
        if (disabled) {
            this.form.disable();
        }
        else {
            this.form.enable();
        }

    }

}