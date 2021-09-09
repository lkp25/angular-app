import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Recipie } from '../recipe-model';
import { RecipieService } from '../recipie.service';


@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrls: ['./recipie-detail.component.css']
})

@Injectable()
export class RecipieDetailComponent implements OnInit {
  @Input() recipie: Recipie
  
  constructor(private RecipieService: RecipieService) { }
  
  ngOnInit(): void {
    
  }

  onAddToShoppingList(){
    this.RecipieService.addIngredientsToShoppingList(this.recipie.ingredients)
  }
  

}
