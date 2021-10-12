import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false
  private userSub: Subscription
  private logoutSub: Subscription
  public logoutIn: number
  private timeoutDisplayInterval: any

  constructor(
    private dataService: DataStorageService,
    private authService: AuthService,
    ){}

  ngOnInit(){
    //update UI with the timeout display
     this.timeoutDisplayInterval = setInterval(() => {
      if(this.logoutIn && this.logoutIn > 0){
        this.logoutIn -= 1
      }
    }, 1000);
     this.logoutSub = this.authService.logoutTimer.subscribe(logoutIn=>{
      this.logoutIn = Math.ceil(logoutIn / 1000)
    })


    //suscribe to the user stream - check login status
   this.userSub = this.authService.user.subscribe(user =>{
      //got the user object from stream? so it is logged in
      //  this.isAuthenticated = !user ? false : true
      console.log(user);
      
       this.isAuthenticated = !!user 
     
   })
  } 
  onSaveData(){
    this.dataService.storeRecipies()
    
  }
  onLoadData(){
    this.dataService.getAllRecipes()
  }
  onRefreshToken(){
    this.authService.refreshToken()
  }
  onLogout(){
    this.authService.logout()
  }
  ngOnDestroy(){
    this.userSub.unsubscribe()
    this.logoutSub.unsubscribe()
    clearInterval(this.timeoutDisplayInterval)
    this.timeoutDisplayInterval = null
  }
}