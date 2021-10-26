import { useAnimation , transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { bounce } from 'ng-animate';

import { Recipie } from './recipe-model';
import { RecipieService } from './recipie.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css'],
 
  animations: [
    trigger('bounce', [transition('void => *', useAnimation(bounce))])
  ]
 
})
export class RecipiesComponent implements OnInit{
  selectedRecipie: Recipie
  
  constructor(private RecipieService: RecipieService) { }

  ngOnInit(){
    this.RecipieService.recipieSelected.subscribe(
      (recipie: Recipie) => {
        this.selectedRecipie = recipie
      }
    )
  }
 
  
  

}
