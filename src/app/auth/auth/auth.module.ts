import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthComponent } from "./auth.component";

const routes = [
    {path: '', component: AuthComponent}
]

@NgModule({
    declarations:[AuthComponent],
    exports: [AuthComponent,RouterModule],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class AuthModule{}