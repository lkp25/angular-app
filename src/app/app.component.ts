import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { take } from 'rxjs/operators';
import { AuthService } from './auth/auth/auth.service';
import { RouterOutlet } from '@angular/router';
import { stepper,fader , slideInAnimation } from './app.animations';
import { WebsocketService } from './shared/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    stepper
  ]
})
export class AppComponent implements OnInit{
  title = 'myapp';
  constructor(
    private websocketService: WebsocketService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId 
    ) {}

  @HostListener('window:click', ['$event'])
  onClick(){
    this.authService.user.pipe(take(1)).subscribe((userData) => {
     if(userData){
      console.log('REFRESH TOKEN UPON EVERY DOCUMENT CLICK!');
      
       this.authService.refreshToken()
     }
    });
    
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  ngOnInit(){
    if(isPlatformBrowser(this.platformId)){
      this.authService.autoLogin()
    }

    //custom event emitted from server
    this.websocketService.listen('test-event')
    .subscribe(data => console.log(data))

    //connection established, id acquired
    this.websocketService.listen('connect')
    .subscribe(data => console.log(this.websocketService.socket.id))
    
    
    //client to server:
    this.websocketService.emit('client-says', 'hello server!')
    //here this same message as above is emitted by server under 'received' event.
    
    this.websocketService.listen('received')
    .subscribe(data => console.log(data))
  }
}
