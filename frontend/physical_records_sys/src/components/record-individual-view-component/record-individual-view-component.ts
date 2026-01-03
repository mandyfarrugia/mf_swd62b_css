import { AuthenticationService } from './../../services/authentication-service';
import { PhysicalRecordDto } from './../../dtos/physical-records-dto';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { PhysicalRecordsService } from '../../services/physical-records-service';
import { CurrencyPipe } from '@angular/common';
import { AuthenticationService } from '../../services/authentication-service';

@Component({
  standalone: true,
  selector: 'app-record-individual-view-component',
  imports: [RouterLink, RouterModule, CurrencyPipe ],
  templateUrl: './record-individual-view-component.html',
  styleUrl: './record-individual-view-component.css',
})
export class RecordIndividualViewComponent implements OnInit {
  private recordFetchedById : PhysicalRecordDto | null = null;

  recordById = signal<PhysicalRecordDto | null>(null);

  constructor(
    private currentRoute: ActivatedRoute,
    private router : Router,
    private _authenticationService: AuthenticationService,
    private physicalRecordsService : PhysicalRecordsService
  ) {}

  public get authenticationService() : AuthenticationService {
    return this._authenticationService;
  }

  ngOnInit(): void {
    const idParsedFromRequestParameter = Number(this.currentRoute.snapshot.paramMap.get('id'));
    this.physicalRecordsService.getPhysicalRecordById(idParsedFromRequestParameter).subscribe(
      {
        next: (data) => {
          this.recordById.set(data);
          console.log(this.recordFetchedById);
        },
        error: (error) => console.error(error)
      }
    );
  }

  public isCustomerInformationAvailable() : boolean {
    return Boolean(this.recordById()?.customerId && this.recordById()?.customerFirstName && this.recordById()?.customerLastName && this.recordById()?.customerContact && this.recordById()?.customerEmail);
  }

  private displayRecordDetails() : void {
    //this.physicalRecordsService.getPhysicalRecordById(id).subscribe();
  }

  public deletePhysicalRecord(id: number | undefined) : void {
    if(!id) {
      return;
    }

    this.physicalRecordsService.deletePhysicalRecord(id).subscribe({
      next: () => this.router.navigate(['/records']),
      error: (error) => console.error(error)
    });
  }
}
