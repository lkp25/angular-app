import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',

  styleUrls: ['./courses.component.css'],
  // ===============================================================
  // custom error message for all forms must be enabled !!!!!!
  // ===========================================================
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError:true}
  }]
})
export class CoursesComponent implements OnInit {

  constructor() {
    // console.log(this.arr);
    // const newArr = []
    // while(this.arr.length > 0){
    //   if(this.arr[1] - this.arr[0] === 1 && this.arr[2] - this.arr[1] === 1){
    //     this.arr.splice(1, 1)  
    //     newArr.push(this.arr.shift() + '-')
    //   } 
    //   else if(this.arr[1] - this.arr[0] === 1){
    //     newArr.push(this.arr.shift() + '-')
    //     newArr.push('-', this.arr.shift())
        
    //   }
      
      

      
      
      // else {
      //   newArr.push(this.arr.shift()) 
      // } 
    // }
    // console.log(newArr);
    // console.log(this.arr);
    // const h = newArr.map((a)=>{
    //   if(typeof a === 'number'){
    //     return 'A' + a + 'B'
    //   }
    //   return a
    // })
    // console.log(h);
    
    // const stri = h.join().replace(/\-[\,\-\d]+A/gm,'-').replace(/[AB]/gm,'')
  
    
    // console.log(stri.split(','));
    
    
  }

  arr = [1,2,3,4,6,8,9,10,15]
  ngOnInit(): void {
    
  }

  submit(step1, step2, step3){
    console.log(step1);
    console.log(step2);
    console.log(step3);
    

  }
}
