import { FormGroup, ValidatorFn, Validators } from "@angular/forms";

export function createPromoRangeValidator(): ValidatorFn{
    return (form: FormGroup): Validators | null => {
        
        const startDate: Date = form.get('promoStartAt').value
        const endDate: Date = form.get('promoEndAt').value
        
        if(!startDate || !endDate) return null
        const isRangeValid = (endDate?.getTime() - startDate?.getTime() > 0)
        return isRangeValid ? null : {promoPeriodError:true}

        
        
    }
}