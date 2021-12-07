The purpose of this project is extesive practice of Angular specific concepts. 
It heavily depends on the backend service from 'APIforAngular' repository.

Project consists of couple of lazy-loaded modules with custom preloading strategy and some guards (canLoad and canActivate).

It utilizes advanced routing concepts like multiple router-outlets handling, child routes handling and routing transition animations.

Multiple services are used for both universal as well as module or even component-specific business logic. It also uses custom directives.

Angular Material was used especially in conjunction with reactive forms in order to make the UI look good and obtain some neat functionality Material Components provide out of the box.

Reactive forms are being very thoroughly used here, not just the basic scenarios but advanced concepts like form arrays, multi-cross-field validation with custom validator functions, async validators and even custom form control for uploading files of only certain size range and types. Live validation errors provide immidiate feedback for the user in case of incorrect input occurrence.

In the crypto module, chart.js library was used for drawing live-updated charts using data periodically aquired via WEBSOCKET stream from the server. RxJS plays an immense role here in order to handle live data visualization smooth.

But where RxJS shines even brighter here is the RxJS module itself, where a real-time chat client is developed. The chat lets users to enter just by entering a name. If the name is taken though, server will return an error and user will be prompted to choose a different name. 
After 'logging in' user sees a list of all available online users. It is a live stream of course handled by RxJS. Separate stream is used for messaging - users can enter one-on-one conversations by simply clicking other user name and writing a message. It will immidiately be reflected in the receiver's UI. 

What makes the chat app really impressive though is that it uses Asymmetric Key Cryptography for keeping the messages private at all times. How does this work?

Fortunately, most browsers provide an API for that - a global 'crypto' object. After user is 'logged-in' the crypto library generates a key-pair for this user. Private key is ONLY STORED IN THE RUNTIME MEMORY. It is never persisted to local storage or sent to the server. It is kept private for each and every client and is only valid for the duration of the session - until user closes this tab.

The public key however must be sent to the server and shared with all the users who want to send messages to this client. It is however less straightforward than one would expect - the public key is of type Crypto Key, which is a large binary object and cannot be simply strigified to JSON format. Instead it has to be encoded and exported using the crypto API to create a portable format that can be sent to the server. This portable format is not suitable for encrypting messages with it though - therefore it must be decoded and imported to the other client's browser memory in order to use it after it was obtained from the server.

All the complicated logic is abstracted away from the user and the chat could not be simplier to use. It uses safe RSA-OAEP algorhytm with 4096 key length.







