import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhysicalRecordDto } from '../dtos/physical-records-dto';

@Injectable({
  providedIn: 'root',
})
export class PhysicalRecordsService {
  private endpoint: string = "http://localhost:3000/api/records";

  constructor(private http: HttpClient) {
  }

  public getPhysicalRecords() : Observable<PhysicalRecordDto[]> {
    return this.http.get<PhysicalRecordDto[]>(this.endpoint);
  }

  public getPhysicalRecordById(id : number) : Observable<PhysicalRecordDto> {
    return this.http.get<PhysicalRecordDto>(`${this.endpoint}/${id}`);
  }
}