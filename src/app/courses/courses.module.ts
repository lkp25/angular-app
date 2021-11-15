import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './courses.component';



@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule, SharedModule, ReactiveFormsModule
  ]
})
export class CoursesModule { }
