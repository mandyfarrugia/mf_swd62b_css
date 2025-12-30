import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhysicalRecordsService {
  private readonly BASE_URL: string = "http://localhost:3000";
}