import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


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
  couponCode
  constructor(private route: ActivatedRoute, private router: Router) {    
  }
 
  ngOnInit(): void {
    //snapshot - for query params more often use case scenario
    this.couponCode = this.route.snapshot.queryParamMap.get('couponCode')
    //observable - if url is going to change on the same instance of this component:
    this.route.queryParams.subscribe(value => this.couponCode = value['couponCode'])
    
  }

  submit(step1, step2, step3){
    console.log(step1);
    console.log(step2);
    console.log(step3);
    

  }
  obtainCouponCode(){
    this.router.navigate(['/courses'],{
      queryParams: {couponCode: "ABC",
  
    },
    relativeTo:this.route}
    )
    
  }
}
