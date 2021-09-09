import { Directive,ElementRef,Renderer2,HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[app-dropdown]'
})
export class DropdownDirective{
    constructor(private elRef: ElementRef, private renderer: Renderer2) { }
    @HostBinding('class.open') isOpen = false
    @HostListener('document:click', ['$event']) toggleOpen(event:Event){
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false
}



}