import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsComponent } from './rxjs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RxjsComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, SharedModule
  ]
})
export class RxjsModule { }
