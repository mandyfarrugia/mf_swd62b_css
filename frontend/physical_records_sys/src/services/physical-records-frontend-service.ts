import { PhysicalRecordDto } from '../dtos/physical-records-dto';
import { PhysicalRecordsRepository } from '../interfaces/physical-records-repository';
import { Injectable } from '@angular/core';
import { PhysicalRecordsService } from './physical-records-service';
import { SweetAlertResult } from 'sweetalert2';
import { confirmDeleteOptions } from '../shared/alert-options';
import { AlertService } from './alert-service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PhysicalRecordsFrontendService implements PhysicalRecordsRepository {
  constructor(private alertService: AlertService, private physicalRecordsService: PhysicalRecordsService) {}

  delete(id: number, successCallback: () => void): void {
    this.physicalRecordsService.deletePhysicalRecord(id).subscribe({
      next: () => successCallback(),
      error: (error) => console.error(error)
    });
  }

  update(id: number, formGroup: FormGroup, successCallback: () => void, errorCallback: (error: any) => void): void {
    const payload = formGroup.getRawValue();
    this.physicalRecordsService.updatePhysicalRecord(id, payload).subscribe({
      next: () => successCallback(),
      error: (error) => errorCallback(error)
    });
  }

  public handleConfirmationDeletion(id: number, successCallback: () => void): void {
    const confirmDeletion: Promise<SweetAlertResult> = this.alertService.showAlert(confirmDeleteOptions);

    confirmDeletion.then((result) => {
      if (result.isConfirmed) {
        this.delete(id, () => successCallback());
      }
    });
  }
}
