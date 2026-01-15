import { WritableSignal } from '@angular/core';
import { PhysicalRecordDto } from '../dtos/physical-records-dto';

export interface PhysicalRecordsRepository {
  create(payload: PhysicalRecordDto, successCallback: () => void, error: WritableSignal<string | null>): void;
  delete(id: number, successCallback: () => void, error: WritableSignal<string | null>) : void;
  update(id: number, payload: PhysicalRecordDto, successCallback: () => void, error: WritableSignal<string | null>) : void;
}
