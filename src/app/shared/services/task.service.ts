import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly rootURL = 'http://localhost:49417/api';

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    ClaimDate: new FormControl(''),
    ClaimNumber: new FormControl(''),
    Customer: new FormControl('', Validators.required),
    CustomerRequisites: new FormControl(''),
    ListWorks: new FormControl('1')
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      ClaimNumber: '',
      ClaimDate: '',
      Customer: '',
      CustomerRequisites: '',
      ListWorks: ''
    });
  }

  getClaim() {
    return this.http.get(this.rootURL + '/Claim');
  }

  postClaim(claim) {
    console.log('claim - ', claim)
    return this.http.post(this.rootURL + '/Claim', claim);
  }

  putClaim(claim) {
    return this.http.put(this.rootURL + '/Claim/'+ claim.Id, claim);
  }
  
  deleteClaim(id) {
    return this.http.delete(this.rootURL + '/Claim/'+ id);
  }

  populateForm(claim) {
    this.form.setValue(_.omit(claim));
  }
}
