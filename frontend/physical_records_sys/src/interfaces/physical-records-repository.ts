import { WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface PhysicalRecordsRepository {
  delete(id: number, successCallback: () => void, error: WritableSignal<string | null>) : void;
  update(id: number, formGroup: FormGroup, successCallback: () => void, error: WritableSignal<string | null>) : void;
}
