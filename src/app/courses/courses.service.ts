import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  constructor(private http: HttpClient) { }

  findAllCourses(): Observable<any>{
    return this.http.get<any>('https://jsonplaceholder.typicode.com/todos')
    
  }
}
