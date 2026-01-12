import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormatsService {
  private readonly endpoint: string = '/api/formats';

  constructor(private http: HttpClient) {}

  public getFormats(): Observable<string[]> {
    return this.http.get<string[]>(this.endpoint);
  }
}
