The purpose of this project is extesive practice of Angular specific concepts. 
It heavily depends on the backend service from 'APIforAngular' repository.

Project consists of couple of lazy-loaded modules with custom preloading strategy and some guards (canLoad and canActivate).

It utilizes advanced routing concepts like multiple router-outlets handling, child routes handling and routing transition animations.

Multiple services are used for both universal as well as module or even component-specific business logic. It also uses custom directives.

Angular Material was used especially in conjunction with reactive forms in order to make the UI look good and obtain some neat functionality Material Components provide out of the box.

Reactive forms are being very thoroughly used here, not just the basic scenarios but advanced concepts like form arrays, multi-cross-field validation with custom validator functions, async validators and even custom form control for uploading files of only certain size range and types. Live validation errors provide immidiate feedback for the user in case of incorrect input occurrence.

In the crypto module, chart.js library was used for drawing live-updated charts using data periodically aquired via WEBSOCKET stream from the server. RxJS plays an immense role here in order to handle live data visualization smooth.

But where RxJS shines even brighter here is the RxJS module itself, where a real-time chat client is developed. The chat lets users to enter just by entering a name. If the name is taken though, server will return an error and user will be prompted to choose a different name. 
After 'logging in' user sees a list of all available online users. It is a live stream of course handled by RxJS. Separate stream is used for messaging - users can enter one-on-one conversations by simply clicking other user name and writing a message. It will immidiately be reflected in the receiver's UI, 








