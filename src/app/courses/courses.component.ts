import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  aaa 
  constructor() { }

  ngOnInit(): void {
    setInterval(()=>{
      this.aaa = (Math.random() * 10).toString()
    },500)
  }

}
