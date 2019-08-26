import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrigadeService {
  readonly rootURL = 'http://localhost:3289/api';

  constructor(private http: HttpClient) { }

  getAllBrigade() {
    return this.http.get(this.rootURL + '/Brigade');
  }

  getBrigade(id: any) {
    return this.http.get(this.rootURL + '/Brigade/' + id);
  }
}
