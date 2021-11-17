import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input()
  requiredFileType: string
  fileName = ""
  fileUploadError = false
  acceptedFileTypes=['.png','.jpg','.jpeg']
  uploadProgress: number

  constructor(private http: HttpClient) { }

  onFileSelected(event){
    const file:File = event.target.files[0]
    if(file){
      this.fileName = file.name
      console.log(file);

      //append file to a payload:
      const formData = new FormData()
      formData.append("thumbnail", file)

      //set the error flag to false for now:
      this.fileUploadError = false

      this.http.post('http://localhost:8080/files/upload-image', 
      formData, {
        //FOR GETTING THE % of file upload progress!
        reportProgress: true,
        //will now receive some http events not just response/body object
        observe: "events"
      }
      ).pipe(
        //handle error first if any
        catchError(error =>{
          this.fileUploadError = true
          //emit new observable containing error object and complete the stream
          return of(error)
        }),
        finalize(()=>{
          //when stream completes or errors out, 
          // set uploadProgress to null to hide progress bar
          this.uploadProgress = null
        })
      )
      .subscribe(event => {
        console.log(event);
        if(event.type == HttpEventType.UploadProgress){
          //loaded - how much now loaded, total - total to load
          this.uploadProgress = Math.round(100 * (event.loaded / event.total))
        }
      })
    }
    
  }

  ngOnInit(): void {
  }

}
