import { AlertService } from './../../services/alert-service';
import { AuthenticationService } from './../../services/authentication-service';
import { PhysicalRecordDto } from './../../dtos/physical-records-dto';
import { Component, OnInit, signal } from '@angular/core';
import { PhysicalRecordsService } from '../../services/physical-records-service';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-record-individual-view-component',
  imports: [ RouterLink, RouterModule, CurrencyPipe ],
  templateUrl: './record-individual-view-component.html',
  styleUrl: './record-individual-view-component.css',
})
export class RecordIndividualViewComponent implements OnInit {
  private recordFetchedById : PhysicalRecordDto | null = null;

  recordById = signal<PhysicalRecordDto | null>(null);

  constructor(
    private _currentRoute: ActivatedRoute,
    private _router : Router,
    private _alertService: AlertService,
    private _authenticationService: AuthenticationService,
    private _physicalRecordsService : PhysicalRecordsService
  ) {}

  public get authenticationService() : AuthenticationService {
    return this._authenticationService;
  }

  ngOnInit(): void {
    const idParsedFromRequestParameter = Number(this._currentRoute.snapshot.paramMap.get('id'));
    if(!idParsedFromRequestParameter) return;

    this._physicalRecordsService.getPhysicalRecordById(idParsedFromRequestParameter).subscribe({
      next: (data) => this.recordById.set(data),
      error: (error) => console.error(error)
    });
  }

  public isCustomerInformationAvailable() : boolean {
    return Boolean(this.recordById()?.customerId && this.recordById()?.customerFirstName && this.recordById()?.customerLastName && this.recordById()?.customerContact && this.recordById()?.customerEmail);
  }

  public deletePhysicalRecord(id: number | undefined) : void {
    if(!id) return;

    //this._alertService.showAlert()

    this._physicalRecordsService.deletePhysicalRecord(id).subscribe({
      next: () => this._router.navigate(['/records']),
      error: (error) => console.error(error)
    });
  }
}
