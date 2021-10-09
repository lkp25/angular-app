import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true
  isLoading = false
  
  constructor(private authService: AuthService) { 
  }
  
  ngOnInit(): void {
  }
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }
  
  onSubmit(form: NgForm){
    if(!form.valid) return
    
    console.log(form.value);
    
    const userData = {
      name: form.value.name,
      pass: form.value.pass
    }

    this.isLoading = true
    if(this.isLoginMode){
      this.authService.signup(userData).subscribe(ans => {
        console.log(ans)        
        this.isLoading = false
      })
      
    } else {
      this.authService.signup(userData).subscribe(ans => {
        console.log(ans)        
        this.isLoading = false
      })
    }
    form.reset()
  }
}
