import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly rootURL = this.service.rootURL;
  claimNumber: string;
  brigadeName: string;
  brigadeConfirmation: boolean;

  constructor(private http: HttpClient,
              private service: GeneralService) { }

  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    TaskNumber: new FormControl('', Validators.required),
    TaskDate: new FormControl('', Validators.required),
    ClaimId: new FormControl(0, Validators.required),
    Claim: new FormControl(null),
    BrigadeId: new FormControl(0, Validators.required),
    Brigade: new FormControl(null),
    TaskStaging: new FormControl('', Validators.required),
    BrigadeConfirmation: new FormControl(false),
    BrigadeNote: new FormControl(''),
    BrigadeMark: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      Id: 0,
      TaskNumber: '',
      TaskDate: '',
      Claim: null,
      ClaimId: 0,
      Brigade: null,
      BrigadeId: 0,
      TaskStaging: '',
      BrigadeConfirmation: false,
      BrigadeNote: '',
      BrigadeMark: ''
    });
  }

  getAllTask() {
    return this.http.get(this.rootURL + '/Task');
  }

  postTask(task: any) {
    return this.http.post(this.rootURL + '/Task', task);
  }

  putTask(task: any) {
    task.Claim = null;
    task.Brigade = null;
    return this.http.put(this.rootURL + '/Task/' + task.Id, task);
  }

  deleteTask(id: any) {
    return this.http.delete(this.rootURL + '/Task/' + id);
  }

  populateForm(task: any) {
    this.form.setValue(task);
  }
}
