import { AuthenticationService } from '../../services/authentication-service';
import { RouterModule } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { PhysicalRecordsService } from '../../services/physical-records-service';
import { PhysicalRecordDto } from '../../dtos/physical-records-dto';
import { FallbackValuePipe } from '../../pipes/fallback-value-pipe';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { AlertService } from '../../services/alert-service';

@Component({
  standalone: true,
  selector: 'records-list-component',
  imports: [ RouterModule, FallbackValuePipe ],
  templateUrl: './records-list-component.html',
  styleUrl: './records-list-component.css',
})
export class RecordsListComponent implements OnInit {
  /* This signal holds an array of PhysicalRecordDto instances, initially starting off as an empty array.
   * Signals are reactive, thus when set() is invoked within the signal,
   * the signal will notify Angular that the state has changed (change detection is triggered)
   * and the DOM is updated accordingly. In this case, render a table row for each physical record.
   * In the HTML template, the value is read via physicalRecords().
   * Simply using physicalRecords will cause the following error:
   * TS2488: Type 'WritableSignal<PhysicalRecordDto[]>' must have a '[Symbol.iterator]()' method that returns an iterator. */
  physicalRecords = signal<PhysicalRecordDto[]>([]);
  canViewRecords : boolean = false;
  canAddRecords : boolean = false;
  canUpdateRecords : boolean = false;
  canDeleteRecords : boolean = false;

  constructor(
    private alertService: AlertService,
    private authenticationService : AuthenticationService,
    private physicalRecordsService : PhysicalRecordsService) {}

  ngOnInit(): void {
    this.loadPhysicalRecords();
    this.canViewRecords = this.authenticationService.canViewRecords();
    this.canAddRecords = this.authenticationService.canAddRecords();
    this.canUpdateRecords = this.authenticationService.canUpdateRecords();
    this.canDeleteRecords = this.authenticationService.canDeleteRecords();
  }

  loadPhysicalRecords() : void {
    this.physicalRecordsService.getPhysicalRecords().subscribe({
      next: (data) => this.physicalRecords.set(data),
      error: (error) => console.log(error)
    });
  }

  deletePhysicalRecord(id: number): void {
    const confirmDeleteOptions: SweetAlertOptions = {
      title: 'Confirm deletion',
      text: 'Are you sure you want to delete this',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5dc932ff',
      cancelButtonColor: '#c51414ff',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it!'
    };

    const confirmDeletion: Promise<SweetAlertResult> = this.alertService.showAlert(confirmDeleteOptions);

    confirmDeletion.then((result) => {
      if (result.isConfirmed) {
        this.physicalRecordsService.deletePhysicalRecord(id).subscribe({
          next: () => {
            this.loadPhysicalRecords();

            const recordDeletedNotification: SweetAlertOptions = {
              title: 'Record deleted successfully!',
              text: 'The physical record has been deleted.',
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#5dc932ff',
              confirmButtonText: 'OK'
            }

            this.alertService.showAlert(recordDeletedNotification);
          }
        });
      }
    });
  }
}
