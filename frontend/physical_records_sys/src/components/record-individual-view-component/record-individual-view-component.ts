import { StocksService } from './../../services/stocks-service';
import { AlertService } from './../../services/alert-service';
import { AuthenticationService } from './../../services/authentication-service';
import { PhysicalRecordDto } from './../../dtos/physical-records-dto';
import { Component, OnInit, signal } from '@angular/core';
import { PhysicalRecordsService } from '../../services/physical-records-service';
import { CurrencyPipe, LowerCasePipe, NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { StockStatusPipe } from "../../pipes/stock-status-pipe";
import { PhysicalRecordsFrontendService } from '../../services/physical-records-frontend-service';

@Component({
  standalone: true,
  selector: 'app-record-individual-view-component',
  imports: [RouterLink, RouterModule, CurrencyPipe, LowerCasePipe, StockStatusPipe, NgClass],
  templateUrl: './record-individual-view-component.html',
  styleUrl: './record-individual-view-component.css',
})
export class RecordIndividualViewComponent implements OnInit {
  recordById = signal<PhysicalRecordDto | null>(null);

  constructor(
    private _currentRoute: ActivatedRoute,
    private _router : Router,
    private _alertService: AlertService,
    private _authenticationService: AuthenticationService,
    private _physicalRecordsService : PhysicalRecordsService,
    private _physicalRecordsFrontendService: PhysicalRecordsFrontendService,
    private _stocksService: StocksService
  ) {}

  public get authenticationService() : AuthenticationService {
    return this._authenticationService;
  }

  public getCssClassBasedOnStock(stockQuantity: number | undefined) : string | null {
    if(stockQuantity === undefined) return null;
    return this._stocksService.getCssClass(stockQuantity);
  }

  ngOnInit(): void {
    const idParsedFromRequestParameter = Number(this._currentRoute.snapshot.paramMap.get('id'));
    if(!idParsedFromRequestParameter) return;

    this._physicalRecordsService.getPhysicalRecordById(idParsedFromRequestParameter).subscribe({
      next: (data) => this.recordById.set(data),
      error: () => this._router.navigate(['/error-404-not-found'])
    });
  }

  public isCustomerInformationAvailable() : boolean {
    return Boolean(this.recordById()?.customerId && this.recordById()?.customerFirstName && this.recordById()?.customerLastName && this.recordById()?.customerContact && this.recordById()?.customerEmail);
  }

  public deletePhysicalRecord(id: number | undefined) : void {
    if(!id) return;
    this._physicalRecordsFrontendService.handleConfirmationDeletion(id, () => this._router.navigate(['/records']));
  }
}
