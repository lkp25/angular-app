import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CryptoComponent } from './crypto.component';



@NgModule({
  declarations: [
    CryptoComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[DatePipe]
})
export class CryptoModule { }
