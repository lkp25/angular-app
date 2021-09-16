import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipie } from '../recipe-model';
import { RecipieService } from '../recipie.service';


@Component({
  selector: 'app-recipie-detail',
  templateUrl: './recipie-detail.component.html',
  styleUrls: ['./recipie-detail.component.css']
})


export class RecipieDetailComponent implements OnInit {
  recipie: Recipie
  id: number
  
  constructor(
    private RecipieService: RecipieService,
    private route: ActivatedRoute,
    ) { }
  
  ngOnInit(): void {
    //id will be set to load a recipie from a service
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id']
        this.recipie = this.RecipieService.getRecipie(this.id)
      }
    )
  }

  onAddToShoppingList(){
    this.RecipieService.addIngredientsToShoppingList(this.recipie.ingredients)
  }
  

}
