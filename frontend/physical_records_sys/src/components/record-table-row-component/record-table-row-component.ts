import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PhysicalRecordDto } from '../../dtos/physical-records-dto';
import { FallbackValuePipe } from "../../pipes/fallback-value-pipe";
import { RouterLink } from '@angular/router';
import { PhysicalRecordsFrontendService } from '../../services/physical-records-frontend-service';
import { AuthenticationService } from '../../services/authentication-service';
import { AuthorisationService } from '../../services/authorisation-service';

@Component({
  selector: 'tr[record-table-row-component]',
  imports: [FallbackValuePipe, RouterLink],
  templateUrl: './record-table-row-component.html',
  styleUrl: './record-table-row-component.css',
})
export class RecordTableRowComponent {
  @Input({required:true}) physicalRecord: PhysicalRecordDto | null = null;
  @Output() recordDeletedEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private authorisationService: AuthorisationService, private authenticationService: AuthenticationService, private physicalRecordsFrontendService: PhysicalRecordsFrontendService) {}

  public get authorisationService$() {
    return this.authorisationService;
  }

  public deletePhysicalRecord(id: number): void {
    this.physicalRecordsFrontendService.handleConfirmationDeletion(id, () => this.recordDeletedEvent.emit(id));
  }
}
