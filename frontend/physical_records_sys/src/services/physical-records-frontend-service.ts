import { PhysicalRecordDto } from '../dtos/physical-records-dto';
import { PhysicalRecordsRepository } from '../interfaces/physical-records-repository';
import { Injectable, Signal, WritableSignal } from '@angular/core';
import { PhysicalRecordsService } from './physical-records-service';
import { SweetAlertResult } from 'sweetalert2';
import { confirmDeleteOptions } from '../shared/alert-options';
import { AlertService } from './alert-service';
import { FormGroup } from '@angular/forms';
import { GenresRepository } from '../interfaces/genres-repository';
import { GenresService } from './genres-service';
import { FormatsRepository } from '../interfaces/formats-repository';
import { FormatsService } from './formats-service';

@Injectable({
  providedIn: 'root',
})
export class PhysicalRecordsFrontendService implements PhysicalRecordsRepository, GenresRepository, FormatsRepository {
  constructor(private alertService: AlertService, private physicalRecordsService: PhysicalRecordsService) {}

  getAllFormats(formatsService: FormatsService, formats: WritableSignal<string[]>): void {
    formatsService.getFormats().subscribe({
      next: (data) => {
        data.unshift('');
        formats.set(data);
      },
      error: (error) => console.error(error),
    });
  }

  public getAllGenres(genresService: GenresService, genres: WritableSignal<string[]>): void {
    genresService.getGenres().subscribe({
      next: (data) => {
        data.unshift('');
        genres.set(data);
      },
      error: (error) => console.error(error)
    });
  }

  public delete(id: number, successCallback: () => void): void {
    this.physicalRecordsService.deletePhysicalRecord(id).subscribe({
      next: () => successCallback(),
      error: (error) => console.error(error)
    });
  }

  public update(id: number, formGroup: FormGroup, successCallback: () => void, errorCallback: (error: any) => void): void {
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
