import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
      formData
      ).pipe(
        //handle error first if any
        catchError(error =>{
          this.fileUploadError = true
          //emit new observable containing error object and complete the stream
          return of(error)
        })
      )
      .subscribe()
    }
    
  }

  ngOnInit(): void {
  }

}
