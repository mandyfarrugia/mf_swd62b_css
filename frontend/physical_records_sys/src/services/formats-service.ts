import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormatsService {
  private readonly endpoint: string = `${environment.apiUrl}/formats`;

  constructor(private http: HttpClient) {}

  public getFormats(): Observable<string[]> {
    return this.http.get<string[]>(this.endpoint);
  }
}
