import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsComponent } from './rxjs.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RxjsComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule
  ]
})
export class RxjsModule { }
