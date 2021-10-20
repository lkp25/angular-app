import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { RecipieEditComponent } from './recipie-edit/recipie-edit.component';
import { RecipieItemComponent } from './recipie-list/recipie-item/recipie-item.component';
import { RecipieListComponent } from './recipie-list/recipie-list.component';
import { RecipieStartComponent } from './recipie-start/recipie-start.component';
import { RecipiesRoutingModule } from './recipies-routing.module';
import { RecipiesComponent } from './recipies.component';

@NgModule({
  declarations: [
    RecipiesComponent,
    RecipieListComponent,
    RecipieDetailComponent,
    RecipieItemComponent,
    RecipieStartComponent,
    RecipieEditComponent,
  ],
  exports: [
    RecipiesComponent,
    RecipieListComponent,
    RecipieDetailComponent,
    RecipieItemComponent,
    RecipieStartComponent,
    RecipieEditComponent,
  ],
  imports: [RouterModule, RecipiesRoutingModule, CommonModule, ReactiveFormsModule],
})
export class RecipiesModule {}
