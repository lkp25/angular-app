// import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { bounceAnim } from '../../app.animations'
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    bounceAnim
  ]

})
export class AuthComponent implements OnInit {
  isLoginMode = true
  isLoading = false
  error = ''
  
  constructor(
    private authService: AuthService,
    private router: Router
    ) { 
  }
  
  ngOnInit(): void {
  }
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
    // console.log(this.authService.user.subscribe());
    
  }
  
  onSubmit(form: NgForm){
    if(!form.valid) return
    
    console.log(form.value);
    
    const userData = {
      name: form.value.name,
      pass: form.value.pass
    }

    this.isLoading = true
    //LOGIN
    if(this.isLoginMode){
      this.authService.login(userData).subscribe(
        successResponse => {
        console.log(successResponse)        
        this.isLoading = false
        //redirect on success
        this.router.navigate(['/recipies'])
      }
      , errorResponse => {
        this.isLoading = false
        this.error = "wrong credentials"
        console.log(this.error);
        console.log(errorResponse);
        
        this.resetError()
      }
      )
      
    //SIGNUP
    } else {
      this.authService.signup(userData).subscribe(
        successResponse => {
          console.log(successResponse)        
          this.isLoading = false
        }, errorResponse => {
          this.isLoading = false
          this.error = "user exists"
          console.log(this.error);
          this.resetError()
      })
    }
    form.reset()
  }

  resetError(){
    setTimeout(() => {
      this.error = ''
      
    }, 3000);
  }
}
