import { Component, OnInit, Input } from '@angular/core';

import { Recipie } from '../../recipe-model';
import { RecipieService } from '../../recipie.service';

@Component({
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrls: ['./recipie-item.component.css']
})
export class RecipieItemComponent implements OnInit {
  @Input() singleRp:Recipie

  constructor(private RecipieService: RecipieService) { }

  ngOnInit(): void {
  }
  onSelected(){
    this.RecipieService.recipieSelected.emit(this.singleRp)
  }
}
