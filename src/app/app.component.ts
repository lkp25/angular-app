import { Component, HostListener, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from './auth/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'myapp';
  @HostListener('window:click', ['$event'])
  onClick(){
    this.authService.user.pipe(take(1)).subscribe((userData) => {
     if(userData){
      console.log('REFRESH TOKEN UPON EVERY DOCUMENT CLICK!');
      
       this.authService.refreshToken()
     }
    });
    
  }
  
  constructor(private authService: AuthService) {
    
  }

  ngOnInit(){
    this.authService.autoLogin()
  }
}
