import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp';
  activeSubpage = 'Recipies'

  loadNewPage(event){
    this.activeSubpage = event.itemName
  }
}
