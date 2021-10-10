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

  constructor(
    private dataService: DataStorageService,
    private authService: AuthService
    ){}

  ngOnInit(){
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
  onLogout(){
    this.authService.logout()
  }
  ngOnDestroy(){
    this.userSub.unsubscribe()
  }
}