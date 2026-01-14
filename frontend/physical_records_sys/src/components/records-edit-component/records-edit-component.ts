import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormatsService } from '../../services/formats-service';
import { GenresService } from '../../services/genres-service';
import { PhysicalRecordsService } from '../../services/physical-records-service';
import { CurrentRouteService } from '../../services/current-route-service';
import { PhysicalRecordsFrontendService } from '../../services/physical-records-frontend-service';

@Component({
  standalone: true,
  selector: 'app-records-edit-component',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './records-edit-component.html',
  styleUrl: './records-edit-component.css',
})
export class RecordsEditComponent implements OnInit {
  formats: WritableSignal<string[]> = signal<string[]>([]);
  genres: WritableSignal<string[]> = signal<string[]>([]);
  editExistingRecordForm: FormGroup;
  recordId!: number;

  constructor(private router: Router, private currentRouterService: CurrentRouteService, private currentRoute: ActivatedRoute, private physicalRecordsService: PhysicalRecordsService, private physicalRecordsFrontendService: PhysicalRecordsFrontendService, private formatsService: FormatsService, private genresService: GenresService, private formBuilder: FormBuilder) {
    this.editExistingRecordForm = this.formBuilder.nonNullable.group({
      title: ['', [Validators.required]],
      artist: ['', [Validators.required]],
      format: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      releaseYear: [0, [Validators.required, Validators.min(1948), Validators.max(new Date().getFullYear())]],
      price: [0, [Validators.required, Validators.min(0)]],
      stockQty: [0, [Validators.required, Validators.min(0)]],
      customerId: ['', [Validators.required, Validators.pattern(/^0\d{6}[AGHML]$/)]],
      customerFirstName: ['', [Validators.required]],
      customerLastName: ['', [Validators.required]],
      customerContact: ['', [Validators.required, Validators.pattern(/\d{8}/)]],
      customerEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.recordId = Number(this.currentRouterService.getStringifiedIdFromRequestBody(this.currentRoute));
    this.loadRecord();
    this.loadFormats();
    this.loadGenres();
  }

  private loadRecord(): void {
    this.physicalRecordsService.getPhysicalRecordById(this.recordId).subscribe({
      next: (data) => this.editExistingRecordForm.patchValue(data),
      error: (error) => console.log(error)
    })
  }

  private loadFormats(): void {
    this.physicalRecordsFrontendService.getAllFormats(this.formatsService, this.formats);
  }

  public loadGenres(): void {
    this.physicalRecordsFrontendService.getAllGenres(this.genresService, this.genres);
  }

  public onSubmit(): void {
    if(!this.editExistingRecordForm.valid) return;

    this.physicalRecordsFrontendService.update(
      this.recordId,
      this.editExistingRecordForm,
      () => this.router.navigate(['/records']),
      (error) => console.error(error)
    )
  }

  public get formControls() {
    return this.editExistingRecordForm.controls;
  }
}
