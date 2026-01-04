import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhysicalRecordDto } from '../dtos/physical-records-dto';

@Injectable({
  providedIn: 'root',
})
export class PhysicalRecordsService {
  private readonly endpoint: string = "http://localhost:3000/api/records";

  constructor(private http: HttpClient) {}

  public getPhysicalRecords() : Observable<PhysicalRecordDto[]> {
    return this.http.get<PhysicalRecordDto[]>(this.endpoint);
  }

  public getPhysicalRecordById(id : number) : Observable<PhysicalRecordDto> {
    return this.http.get<PhysicalRecordDto>(`${this.endpoint}/${id}`);
  }

  public createPhysicalRecord(record : PhysicalRecordDto) : Observable<PhysicalRecordDto> {
    return this.http.post<PhysicalRecordDto>(this.endpoint, record);
  }

  public updatePhysicalRecord(id : number, record : PhysicalRecordDto) : Observable<PhysicalRecordDto> {
    return this.http.put<PhysicalRecordDto>(`${this.endpoint}/${id}`, record);
  }

  public deletePhysicalRecord(id : number) : Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
