import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  readonly rootURL = this.service.rootURL;

  constructor(private http: HttpClient,
              private service: GeneralService) { }

  getTaskBrigadeForMonth() {
    return this.http.get(this.rootURL + '/Task/report');
  }
}
