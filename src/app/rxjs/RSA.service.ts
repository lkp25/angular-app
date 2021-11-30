import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class RSAService{
    

        /*
        Store the calculated ciphertext here, so we can decrypt the message later.
        */
        ciphertext;
        private publicKey1
        private privatecKey1

        public getPrivateKey(){
            return this.privatecKey1
        }
        public getPublicKey(){
            return this.publicKey1
        }
        /*
        Fetch the contents of the "message" textbox, and encode it
        in a form we can use for the encrypt operation.
        */
        private getMessageEncoding() {
          const messageBox = document.querySelector("#rsa-oaep-message");
          let message = 'messageBox';
          let enc = new TextEncoder();
          return enc.encode(message);
        }
      
        /*
        Get the encoded message, encrypt it and display a representation
        of the ciphertext in the "Ciphertext" element.
        */
        public async encryptMessage(publicKey) {
          let encoded = this.getMessageEncoding();
          this.ciphertext = await window.crypto.subtle.encrypt(
            {
              name: "RSA-OAEP"
            },
            publicKey,
            encoded
          );
      
          let buffer = new Uint8Array(this.ciphertext, 0, 5);
          
          console.log(`${buffer}...[${this.ciphertext.byteLength} bytes total]`);
          
        }
      
        /*
        Fetch the ciphertext and decrypt it.
        Write the decrypted message into the "Decrypted" box.
        */
        public async decryptMessage(privateKey) {
          let decrypted = await window.crypto.subtle.decrypt(
            {
              name: "RSA-OAEP"
            },
            privateKey,
            this.ciphertext
          );
      
          let dec = new TextDecoder();
          const decryptedValue = document.querySelector(".rsa-oaep .decrypted-value");
          decryptedValue.classList.add('fade-in');
          decryptedValue.addEventListener('animationend', () => {
            decryptedValue.classList.remove('fade-in');
          });
          decryptedValue.textContent = dec.decode(decrypted);
        }
      
        /*
        Generate an encryption key pair, then set up event listeners
        on the "Encrypt" and "Decrypt" buttons.
        */
        public generateKey(){
            crypto.subtle.generateKey(
                {
                  name: "RSA-OAEP",
                  // Consider using a 4096-bit key for systems that require long-term security
                  modulusLength: 4096,
                  publicExponent: new Uint8Array([1, 0, 1]),
                  hash: "SHA-256",
                },
                true,
                ["encrypt", "decrypt"]
              ).then((keyPair) => {
                  this.publicKey1 = keyPair.publicKey
                  this.privatecKey1 = keyPair.privateKey

                  this.decryptMessage(keyPair.privateKey);
                  this.encryptMessage(keyPair.publicKey);
                 
                });
            
                
               
       
        }
             
      
}