import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private readonly endpoint: string = `${environment.apiUrl}/genres`;

  constructor(private http: HttpClient) {}

  public getGenres() : Observable<string[]> {
    return this.http.get<string[]>(this.endpoint);
  }
}
