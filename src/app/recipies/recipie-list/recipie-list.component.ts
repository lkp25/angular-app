import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Recipie } from '../recipe-model';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css']
})
export class RecipieListComponent implements OnInit {
  recipies: Recipie[] = [
    new Recipie("a test recipie", 'dsadsadsadsadsadsadad', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS06q-hmeYAq1TfsTBYFAtLDevYpKYQuoyM_w&usqp=CAU"),
    new Recipie("dfdsfsdfde", 'dsadaaaaaaaaaaaaAAAAAAAadad', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS06q-hmeYAq1TfsTBYFAtLDevYpKYQuoyM_w&usqp=CAU")
  ]
  
  @Output() recipieSelectedRepeat = new EventEmitter<object>()
  constructor() { }

  ngOnInit(): void {
  }
  addDetails(details:object){
    this.recipieSelectedRepeat.emit(details)
  }
}
