import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogcovidComponent } from './dogcovid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DogcovidComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DogcovidModule { }
