import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private readonly endpoint: string = '/api/genres';

  constructor(private http: HttpClient) {}

  public getGenres() : Observable<string[]> {
    return this.http.get<string[]>(this.endpoint);
  }
}
