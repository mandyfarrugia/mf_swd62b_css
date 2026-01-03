import { AuthenticationService } from './../../services/authentication-service';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { PhysicalRecordsService } from '../../services/physical-records-service';
import { PhysicalRecordDto } from '../../dtos/physical-records-dto';
import { FallbackValuePipe } from '../../pipes/fallback-value-pipe';
import Swal from 'sweetalert2';

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
    private authenticationService : AuthenticationService,
    private physicalRecordsService : PhysicalRecordsService,
    private router : Router) {}

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

  private showAlert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question', showCancelButton: boolean, confirmButtonText: string, cancelButtonText: string): Promise<any> {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    });
  }

  deletePhysicalRecord(id: number): void {
    this.showAlert(
      'Confirm deletion',
      'Are you sure you want to delete this physical record?',
      'warning',
      true,
      'Yes, delete it!',
      'No, keep it'
    ).then((result) => {
      if (result.isConfirmed) {
        this.physicalRecordsService.deletePhysicalRecord(id).subscribe({
          next: () => {
            this.loadPhysicalRecords();
            this.showAlert(
              'Deleted!',
              'The physical record has been deleted.',
              'success',
              false,
              'OK',
              ''
            );
          }
        });
      }
    });
  }
}
