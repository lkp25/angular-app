import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

import { Recipie } from '../../recipe-model';

@Component({
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrls: ['./recipie-item.component.css']
})
export class RecipieItemComponent implements OnInit {
  @Input() singleRp:Recipie
  @Output() recipieSelected = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }
  onSelected(){
    this.recipieSelected.emit()
  }
}
