import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public showAlert(sweetAlertOptions: SweetAlertOptions): Promise<SweetAlertResult> {
    return Swal.fire(sweetAlertOptions);
  }
}
