import { PhysicalRecordsRepository } from '../interfaces/physical-records-repository';
import { Injectable, Signal, WritableSignal } from '@angular/core';
import { PhysicalRecordsApiService } from './physical-records-api-service';
import { SweetAlertResult } from 'sweetalert2';
import { confirmDeleteOptions } from '../shared/alert-options';
import { AlertService } from './alert-service';
import { GenresRepository } from '../interfaces/genres-repository';
import { GenresService } from './genres-service';
import { FormatsRepository } from '../interfaces/formats-repository';
import { FormatsService } from './formats-service';
import { PhysicalRecordDto } from '../dtos/physical-records-dto';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhysicalRecordsFrontendService implements PhysicalRecordsRepository, GenresRepository, FormatsRepository {
  constructor(private alertService: AlertService, private physicalRecordsApiService: PhysicalRecordsApiService) {}

  create(payload: PhysicalRecordDto, successCallback: () => void, error: WritableSignal<string | null>): void {
    this.physicalRecordsApiService.createPhysicalRecord(payload).subscribe({
      next: () => successCallback(),
      error: (httpError: HttpErrorResponse) => {
        error.set(httpError?.error?.message ?? httpError?.message);
        console.error(httpError);
      }
    });
  }

  getAllFormats(formatsService: FormatsService, formats: WritableSignal<string[]>, error: WritableSignal<string | null>): void {
    formatsService.getFormats().subscribe({
      next: (data: string[]) => {
        data.unshift('');
        formats.set(data);
      },
      error: (httpError: HttpErrorResponse) => {
        error.set(httpError?.error?.message ?? httpError?.message);
        console.error(httpError);
      }
    });
  }

  public getAllGenres(genresService: GenresService, genres: WritableSignal<string[]>, error: WritableSignal<string | null>): void {
    genresService.getGenres().subscribe({
      next: (data: string[]) => {
        data.unshift('');
        genres.set(data);
      },
      error: (httpError: HttpErrorResponse) => {
        error.set(httpError?.error?.message ?? httpError?.message);
        console.error(httpError);
      }
    });
  }

  public delete(id: number, successCallback: () => void, error: WritableSignal<string | null>): void {
    this.physicalRecordsApiService.deletePhysicalRecord(id).subscribe({
      next: () => successCallback(),
      error: (httpError: HttpErrorResponse) => {
        error.set(httpError?.error?.message ?? httpError?.message);
        console.error(httpError);
      }
    });
  }

  public update(id: number, payload: PhysicalRecordDto, successCallback: () => void, error: WritableSignal<string | null>): void {
    this.physicalRecordsApiService.updatePhysicalRecord(id, payload).subscribe({
      next: () => successCallback(),
      error: (httpError: HttpErrorResponse) => {
        error.set(httpError?.error?.message ?? httpError?.message);
        console.error(httpError);
      }
    });
  }

  public handleConfirmationDeletion(id: number, successCallback: () => void, error: WritableSignal<string | null>): void {
    const confirmDeletion: Promise<SweetAlertResult> = this.alertService.showAlert(confirmDeleteOptions);

    confirmDeletion.then((result) => {
      if (result.isConfirmed) {
        this.delete(id, () => successCallback(), error);
      }
    });
  }
}
