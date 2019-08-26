import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  readonly rootURL = 'http://localhost:3289/api';

  constructor() { }
}
