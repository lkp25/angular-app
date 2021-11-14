import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown-directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner/loading-spinner.component";
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { ValidDirective } from "./valid.directive";

@NgModule({
    declarations:[
        LoadingSpinnerComponent,
        DropdownDirective,
        ErrorMsgComponent,
        ValidDirective
    ],
    imports: [CommonModule],
    exports: [
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule,
        ValidDirective,
        ErrorMsgComponent
    ]
})
export class SharedModule{}