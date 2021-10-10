export class User{
    constructor(
        public name: string,          
        private _token: string,
        private _tokenExpDate: string) {
        
    }
    get token(){
        //get the token and check validity
        if(!this._tokenExpDate ||new Date().getTime() > +this._tokenExpDate){
            return null //even if we have a token it is not valid anymore
        }
        return this._token
    }
}