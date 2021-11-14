import { Directive, ElementRef, HostListener, OnChanges, TemplateRef, ViewContainerRef } from "@angular/core";
import { FormControl } from "@angular/forms";
import { RxjsFormService } from "../rxjs/rsxj_form.service";
import { RxjsComponent } from "../rxjs/rxjs.component";

@Directive({
    selector: '[app-validDir]'
    
})
export class ValidDirective{

    constructor(
        private element: ElementRef,
        // private templateRef: TemplateRef<any>,
        // private viewContainer: ViewContainerRef
    ){}

    @HostListener('click', ['$event.target']) onClick(event:Event){
       const a = document.createElement('div')
       a.textContent = "Dfdsfdsfds"
        
        this.element.nativeElement.style.color = 'red'
        this.element.nativeElement.appendChild(a)


    }
  
    

    

    
}