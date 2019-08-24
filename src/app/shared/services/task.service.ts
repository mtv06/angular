import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly rootURL = 'http://localhost:3289/api';

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    TaskNumber: new FormControl(''),
    TaskDate: new FormControl(''),
    ClaimId: new FormControl(0),
    Claim: new FormControl(null),
    BrigadeId: new FormControl(0),
    Brigade: new FormControl(null),
    TaskStaging: new FormControl(''),
    BrigadeConfirmation: new FormControl(false),
    BrigadeNote: new FormControl('', Validators.required),
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

  postTask(task) {
    return this.http.post(this.rootURL + '/Task', task);
  }

  putTask(task) {
    return this.http.put(this.rootURL + '/Task/' + task.Id, task);
  }

  deleteTask(id) {
    return this.http.delete(this.rootURL + '/Task/' + id);
  }

  populateForm(task) {
    console.log(task);
    this.form.setValue(_.omit(task));
  }
}
