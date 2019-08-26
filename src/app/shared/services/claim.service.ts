import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  readonly rootURL = this.service.rootURL;

  constructor(private http: HttpClient,
              private service: GeneralService) { }

  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    ClaimDate: new FormControl('', Validators.required),
    ClaimNumber: new FormControl('', Validators.required),
    Customer: new FormControl('', Validators.required),
    CustomerRequisites: new FormControl(''),
    ListWorks: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      Id: 0,
      ClaimNumber: '',
      ClaimDate: '',
      Customer: '',
      CustomerRequisites: '',
      ListWorks: ''
    });
  }

  getAllClaim() {
    return this.http.get(this.rootURL + '/Claim');
  }

  getClaim(id: any) {
    return this.http.get(this.rootURL + '/Claim/' + id);
  }

  postClaim(claim: any) {
    return this.http.post(this.rootURL + '/Claim', claim);
  }

  putClaim(claim: any) {
    return this.http.put(this.rootURL + '/Claim/' + claim.Id, claim);
  }

  deleteClaim(id: any) {
    return this.http.delete(this.rootURL + '/Claim/' + id);
  }

  populateForm(claim: any) {
    this.form.setValue(claim);
  }

}
