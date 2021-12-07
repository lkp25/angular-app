import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  from,
  fromEvent,
  interval,
  merge,
  noop,
  Observable,
  of,
  pipe,
  throwError,
  timer,
} from 'rxjs';
import {
  catchError,
  concatMap,
  debounceTime,
  delayWhen,
  exhaustMap,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  switchMap,
  take,
  throttle,
} from 'rxjs/operators';
import { RxjsFormService } from './rsxj_form.service';
import { WebsocketService } from '../shared/websocket.service';
import { RSAService } from './RSA.service';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnInit, AfterViewInit {
  @ViewChild('chatbox') chatbox: ElementRef;
  @ViewChild('sendButton') sendButton: ElementRef;
  @ViewChild('draftMessage') draftMessage: ElementRef;
  @ViewChild('username') username: ElementRef;
  PRIVATE_KEY
  chatuser;
  errorMsg;
  activeTabs = [];
  currentOpenedTab;
  activeUsers = [];  
  currentConversationsArchive = {};
  importedPublicKeys = {};



////////////////////////////////////////////
  @ViewChild('saveBtn') saveBtn: ElementRef;
  filteredTodosHigh: Observable<any[] | Object>;
  filteredTodosSmall: Observable<any[] | Object>;
  obs1$: Observable<number>;
  genders = ['male', 'female', 'other'];
  ////////////////////////////////////////////

  mainForm: FormGroup;
  constructor(
    private rxjsFormService: RxjsFormService,
    private wss: WebsocketService,
    private RSA: RSAService
  ) {}

  ngOnInit(): void {
    //generate new key every time this tab is activated
    this.RSA.generateKey();
    this.RSA.getPrivateKey().subscribe(value => {
      this.PRIVATE_KEY = value
    })

    this.mainForm = new FormGroup({
      username: new FormControl('default', Validators.required),
      email: new FormControl('null', Validators.required),
      gender: new FormControl('male', Validators.required),
    });

    this.mainForm.valueChanges
      .pipe(
        filter(() => this.mainForm.valid),
        // debounceTime(3000),
        throttle(() => interval(500)),
        switchMap((changes) => this.rxjsFormService.getev())
      )
      .subscribe();

    // const obs1$ = interval(1000)
    // const obs2 = obs1$.pipe(map(value=> value *10))

    // const obs3 = merge(obs1$, obs2)
    // obs3.subscribe()

    function fetchData(url): Observable<any[]> {
      //INSTANTIATE ABORT SIGNAL
      const controller = new AbortController();
      const signal = controller.signal;

      return Observable.create((observer) => {
        fetch(url, {
          signal: signal, //ABORT SIGNAL PROVIDER!!!
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              observer.error('request failed status:' + response.status);
            }
          })
          .then((body) => {
            //emit value in observable and complete
            observer.next(body);
            observer.complete();
          })
          .catch((err) => observer.error(err));
        return controller.abort();
      });
    }

    const http$ = fetchData('https://jsonplaceholder.typicode.com/todos');
    const todos$ = this.rxjsFormService.getev().pipe(
      map((res) => {
        //  res.length = 10
        return res;
      }),
      //add to share all subscriptions as one stream
      shareReplay(),
      retryWhen((error) => error.pipe(delayWhen(() => timer(2000))))
    );

    // this.filteredTodosHigh = todos$.pipe(
    //   map(data => data.filter((todo)=>todo.id >= 6))
    // )
    // this.filteredTodosSmall = todos$.pipe(
    //   map(data => data.filter((todo)=>todo.id < 6))
    // )
    this.filteredTodosHigh = todos$;

    todos$.subscribe(
      (data) => console.log(data),
      noop,
      () => console.log('completed')
    );
  }

  ngAfterViewInit() {
    //full access to the DOM guaranteed.
    fromEvent(this.saveBtn.nativeElement, 'click').pipe(
      concatMap(() => this.savetoDB(this.mainForm.value))
    );
  }

  savetoDB(changes) {
    //INSTANTIATE ABORT SIGNAL
    const controller = new AbortController();
    const signal = controller.signal;

    return from(
      fetch('https://jsonplaceholder.typicode.com/todos', {
        signal: signal, //ABORT SIGNAL PROVIDER!!!
        method: 'GET',
        // body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json',
        },
      })
    );
  }
  // ======================================================================
  //   ======================================================================
  // ======================================================================
  // ======================================================================
  //
  // ======================================================================
  //   ======================================================================
  enterChat(username) {
    //look who is in:
    this.wss
      .listen('current-user-list')
      .subscribe((activeUsers: any[]) => (this.activeUsers = activeUsers));

    this.RSA.getPublicKey()
      .pipe(take(1))
      .subscribe(async (key) => {
        //after obtaining public key, send it to server with username
        if (key) {
          console.log(key);
          const exportedKey = await window.crypto.subtle.exportKey('jwk', key);
          const entry = {
            username: username,
            key: exportedKey,
          };
          console.log(entry);

          this.wss.emit('newuserjoined', entry);

          //what is the server response?
          this.wss
            .listen('newuserjoined')
            .pipe(take(1))
            .subscribe((value: any) => {
              //error ocurred
              if (value.error) {
                this.errorMsg = value.error;
                //display it and then remove
                setTimeout(() => {
                  this.errorMsg = null;
                }, 3000);
                console.log(value.error);
              } else {
                //new user joined successfully - save new details
                console.log(value.message);
                this.activeUsers = value.activeUsers;
                console.log(this.activeUsers);
                this.chatuser = username;
              }
            });
        }
      });
    //unable receiving messages:
    this.receiveMessages();
  }

  receiveMessages() {
    let sender;
    let message;
    this.wss.listen('send-message').subscribe(async (value: any) => {
      const decryptedMessage = await window.crypto.subtle.decrypt(
        {
          name: "RSA-OAEP"
        },
        this.PRIVATE_KEY,
        value.message
      );  
      //text after decryption is still encoded - needs decoding:    
      const dec = new TextDecoder();       
      const result = dec.decode(decryptedMessage);
      
      
      sender = value.sender;
      message = result;


      //initialize the archive if not yet initialized:
      if (!this.currentConversationsArchive[sender]) {
        this.currentConversationsArchive[sender] = { messages: [] };
      }
      //push new message to appropriate archive:
      this.currentConversationsArchive[sender].messages.push({
        sender: sender,
        msg: message,
      });

      //conversation already started? dont activate new tab, else activate new tab
      if (!this.activeTabs.includes(sender)) {
        this.activeTabs.push(sender);
      }
      //first message - GET PUBLIC KEY OF SENDER TO REPLY HIM and switch to his tab
      this.swichToConversationWith(sender);
      this.getPublicKeyOfCurrentPeer(sender)

      //FOCUS DISPLAY ON LAST MSG
      setTimeout(() => {
        this.focusDisplayOnLastMessage();
      }, 100);
    });
    console.log(this.currentConversationsArchive);
  }

  startNewConversation(user) {
    //ignore action if tab is already opened
    if (this.activeTabs.find((name) => name === user.username)) {
      return;
    }    
    this.getPublicKeyOfCurrentPeer(user.username)

    //not opened? create new conversation:
    this.activeTabs.push(user.username);
    //if starting new conversation, make it active one
    this.swichToConversationWith(user.username);

    //initilize the ARCHIVE for this conversation:
    this.currentConversationsArchive[user.username] = { messages: [] };
  }


  getPublicKeyOfCurrentPeer(peerName){
    const indexOfCurrentPeer = this.activeUsers.findIndex((u) => {
      return u.username === peerName;
    });
    const portablePublicKey = this.activeUsers[indexOfCurrentPeer].key;
    console.log(indexOfCurrentPeer);
    const realPublicKey = window.crypto.subtle
      .importKey(
        'jwk',
        portablePublicKey,
        {
          name: 'RSA-OAEP',
          hash: 'SHA-256',
        },
        true,
        ['encrypt']
      )
      .then((realKey) => (this.importedPublicKeys[peerName] = realKey));
  }

  swichToConversationWith(tab) {
    this.currentOpenedTab = tab;
  }

  clearDraftMessage(draftMessage) {
    draftMessage.value = '';
  }

  @HostListener('window:keydown', ['$event'])
  sendMessageOnEnterKey(event: KeyboardEvent){
    if(event.key === 'Enter'){
      const nameInput = this.username?.nativeElement || null
      const msgTextarea = this.draftMessage?.nativeElement || null
      if(nameInput && nameInput.value !== ''){
        return this.enterChat(nameInput.value)
      }
      if(msgTextarea){
        return this.sendMessageTo(this.draftMessage.nativeElement, this.currentOpenedTab)
      }
      console.log(event.key);

    }
  }

  sendMessageTo(draftMessage, currentOpenedTab) {
    //copy msg content and clear textarea
    const message = draftMessage.value;
    this.clearDraftMessage(draftMessage);

    //get ID of receiver
    const userIndex = this.activeUsers.findIndex((u) => {
      return u.username === currentOpenedTab;
    });
    console.log(userIndex);
    const roomID = this.activeUsers[userIndex].id;
    console.log(roomID);

    //save msg in the main store for the sender under appropriate record:
    this.currentConversationsArchive[currentOpenedTab].messages.push({
      sender: 'me',
      msg: message,
    });
    console.log(this.currentConversationsArchive);
    //specify sender name
    const sender = this.chatuser;

    //get public key of receiver:
    const publicKey = this.importedPublicKeys[currentOpenedTab]
    console.log(publicKey);
    
    // encrypt message:
    let encryptedMessage
    const enc = new TextEncoder();
    const encodedMessage = enc.encode(message);
    window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP"
      },
      publicKey,
      encodedMessage
    ).then(encrypdedMsg => {
      encryptedMessage = encrypdedMsg
      // let buffer = new Uint8Array(this.encrypdedMsg, 0, 5);
      console.log(encrypdedMsg.toString());
      
       //emit ready message
       this.wss.emit('send-message', { message: encrypdedMsg, roomID, sender });
       //FOCUS DISPLAY ON LAST MSG
       setTimeout(() => {
         this.focusDisplayOnLastMessage();
       }, 100);
    })

    

    
     

    
  }

  focusDisplayOnLastMessage() {
    //focus display on the last message:
    this.chatbox.nativeElement.scrollTop =
      this.chatbox.nativeElement.scrollHeight + 233;
  }

  endConversation(currentOpenedTab) {
    //clear archive
    this.currentConversationsArchive[currentOpenedTab].messages = [];

    //remove from active tabs
    this.activeTabs = this.activeTabs.filter((tab) => {
      return tab !== currentOpenedTab;
    });

    //set current opened tab to other tab:
    this.currentOpenedTab = this.activeTabs[0];
  }
}
