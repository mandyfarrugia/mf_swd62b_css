import { PhysicalRecordDto } from '../dtos/physical-records-dto';
import { PhysicalRecordsRepository } from '../interfaces/physical-records-repository';
import { Injectable } from '@angular/core';
import { PhysicalRecordsService } from './physical-records-service';

@Injectable({
  providedIn: 'root',
})
export class PhysicalRecordsFrontendService implements PhysicalRecordsRepository {
  constructor(private physicalRecordsService: PhysicalRecordsService) {}

  delete(id: number, nextCallback: () => void): void {
    this.physicalRecordsService.deletePhysicalRecord(id).subscribe({
      next: () => nextCallback(),
      error: (error) => console.error(error)
    });
  }

  update(id: number, physicalRecordToUpdate: PhysicalRecordDto): void {
    throw new Error('Method not implemented.');
  }
}
