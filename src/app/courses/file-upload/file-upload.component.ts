import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent
    }
  ]
})
export class FileUploadComponent implements Validator, ControlValueAccessor, OnInit {
  @Input()
  requiredFileType: string

  fileName = ""

  fileUploadError = false

  fileUploadSuccess = false

  acceptedFileTypes=['.png','.jpg','.jpeg']

  uploadProgress: number

  //constructor
  constructor(private http: HttpClient) { }

  //CONTROLVALUEACCESSOR MEHTODS:
  //callbacks reporting to parent form changes and touches
  onChange = (fileName)=> {}
  onTouched = ()=> {}

  disabled = false
  //parent form can now set this value from outside
  writeValue(value: any){
    this.fileName = value
  }
  registerOnChange(onChange: any){
    this.onChange = onChange
  }
  registerOnTouched(onTouched: any){
    this.onTouched = onTouched
  }
  //flag to be set by property binding to the upload button's disabled property
  setDisabledState(disabled: boolean){
    this.disabled = disabled
  }
  //VALIDATOR METHODs:
  onValidatorChange = () => {}

  validate(control: AbstractControl):ValidationErrors | null {
    if(this.fileUploadSuccess){
      return null 
    }
    //initial error - before user uploaded anything
    let errors: any = {
      requiredFileType: this.requiredFileType
    }
    if(this.fileUploadError){
      errors.uploadFailed = true
    }
    //return errors object:
    return errors
  }
  //notifies parent form that change occured to the value so it can be validated again
  registerOnValidatorChange(onValidatorChange: ()=> void): void{
    this.onValidatorChange = onValidatorChange
  }




  //COMPONENT SPECIFIC METHODS:
  onClick(fileUploadElement: HTMLInputElement){
    this.onTouched()
    fileUploadElement.click()
  }

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
        
        if(event.type == HttpEventType.UploadProgress){
          //loaded - how much now loaded, total - total to load
          this.uploadProgress = Math.round(100 * (event.loaded / event.total))
        }
        else if(event.type == HttpEventType.Response){
          //pass the successfully uploaded file name to the parent form through callback
          this.onChange(this.fileName)
          //change flag of update to successful
          this.fileUploadSuccess = true
          //report to the parent form to re-verify validity:
          this.onValidatorChange()
        }
      })
    }
    
  }

  ngOnInit(): void {
  }

}
