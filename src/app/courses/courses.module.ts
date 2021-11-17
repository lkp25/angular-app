import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './courses.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { FileUploadComponent } from './file-upload/file-upload.component';




@NgModule({
  declarations: [
    CoursesComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    FileUploadComponent,
    
  ],
  imports: [
    CommonModule, SharedModule, ReactiveFormsModule
  ]
})
export class CoursesModule { }
