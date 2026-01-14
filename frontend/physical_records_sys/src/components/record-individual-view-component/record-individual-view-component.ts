import { StocksService } from '../../services/stocks-service';
import { AlertService } from '../../services/alert-service';
import { AuthenticationService } from '../../services/authentication-service';
import { PhysicalRecordDto } from '../../dtos/physical-records-dto';
import { Component, OnInit, signal } from '@angular/core';
import { PhysicalRecordsApiService } from '../../services/physical-records-api-service';
import { CurrencyPipe, LowerCasePipe, NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { StockStatusPipe } from "../../pipes/stock-status-pipe";
import { PhysicalRecordsFrontendService } from '../../services/physical-records-frontend-service';
import { CurrentRouteService } from '../../services/current-route-service';

@Component({
  standalone: true,
  selector: 'record-individual-view-component',
  imports: [RouterLink, RouterModule, CurrencyPipe, LowerCasePipe, StockStatusPipe, NgClass],
  templateUrl: './record-individual-view-component.html',
  styleUrl: './record-individual-view-component.css',
})
export class RecordIndividualViewComponent implements OnInit {
  recordId!: number;
  recordById = signal<PhysicalRecordDto | null>(null);

  constructor(
    private currentRouterService: CurrentRouteService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private physicalRecordsApiService: PhysicalRecordsApiService,
    private physicalRecordsFrontendService: PhysicalRecordsFrontendService,
    private stocksService: StocksService
  ) {}

  public get authenticationService$() : AuthenticationService {
    return this.authenticationService;
  }

  public getCssClassBasedOnStock(stockQuantity: number | undefined) : string | null {
    if(stockQuantity === undefined) return null;
    return this.stocksService.getCssClass(stockQuantity);
  }

  ngOnInit(): void {
    const idParsedFromRequestParameter: number = Number(this.currentRouterService.getStringifiedIdFromRequestBody(this.currentRoute));
    if(!idParsedFromRequestParameter) return;

    this.physicalRecordsApiService.getPhysicalRecordById(idParsedFromRequestParameter).subscribe({
      next: (data) => this.recordById.set(data),
      error: () => this.router.navigate(['/error-404-not-found'])
    });
  }

  public isCustomerInformationAvailable() : boolean {
    return Boolean(this.recordById()?.customerId && this.recordById()?.customerFirstName && this.recordById()?.customerLastName && this.recordById()?.customerContact && this.recordById()?.customerEmail);
  }

  public deletePhysicalRecord(id: number | undefined) : void {
    if(!id) return;
    this.physicalRecordsFrontendService.handleConfirmationDeletion(id, () => this.router.navigate(['/records']));
  }
}
