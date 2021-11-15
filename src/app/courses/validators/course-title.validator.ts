import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CoursesService } from "../courses.service";

//ASYNC VALIDATOR - check on the backend if course with a name already exists or not.
export function courseTitleValidator(courses: CoursesService): AsyncValidatorFn{

   
    return (control: AbstractControl): Promise<any> | Observable<any>=> {
       return courses.findAllCourses()
       .pipe(
           //getting all from jsonplaceholder
           map(todos => {
                console.log(todos);
                console.log(control.value);
                 
               const findSameTitle = todos
               .find((todo=>{
                   
                   //compare ids instead of title
                   return todo.id == control.value}))
               return findSameTitle ? {titleExists: true} : null
           })
       )
    }
}