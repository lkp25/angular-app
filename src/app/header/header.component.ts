import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() menuItemClicked = new EventEmitter<{itemName:string}>()
  
  onMenuItemClicked(item:string){
    this.menuItemClicked.emit({itemName:item})
  }
}