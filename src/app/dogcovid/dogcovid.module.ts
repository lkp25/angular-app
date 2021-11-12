import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogcovidComponent } from './dogcovid.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DogcovidComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class DogcovidModule { }
