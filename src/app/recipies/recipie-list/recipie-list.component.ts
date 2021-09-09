import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Recipie } from '../recipe-model';
import { RecipieService } from '../recipie.service';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css']
})
export class RecipieListComponent implements OnInit {
  recipies: Recipie[]
  
  @Output() recipieSelectedRepeat = new EventEmitter<object>()
  constructor(private RecipieService:RecipieService) { }

  ngOnInit(): void {
    this.recipies = this.RecipieService.getRecipies()
  }
  addDetails(details:object){
    this.recipieSelectedRepeat.emit(details)
  }
}
