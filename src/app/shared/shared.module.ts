import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown-directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner/loading-spinner.component";
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { ValidDirective } from "./valid.directive";
import { MaterialModule } from "../material/material.module";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { AddressFormComponent } from "../courses/address-component/address.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HoldableDirective } from './holdable.directive';
import { ChatComponent } from "../chat/chat.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations:[
        ChatComponent,
        AddressFormComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        ErrorMsgComponent,
        ValidDirective,
        HoldableDirective
    ],
    imports: [RouterModule, CommonModule, MaterialModule, ScrollingModule, ReactiveFormsModule],
    exports: [
        ChatComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule,
        ValidDirective,
        ErrorMsgComponent,
        MaterialModule,
        ScrollingModule,
        AddressFormComponent,
        HoldableDirective
    ]
})
export class SharedModule{}