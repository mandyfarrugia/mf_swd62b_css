import { FormGroup } from '@angular/forms';

export interface PhysicalRecordsRepository {
  delete(id: number, successCallback: () => void) : void;
  update(id: number, formGroup: FormGroup, successCallback: () => void, errorCallback: () => void) : void;
}
