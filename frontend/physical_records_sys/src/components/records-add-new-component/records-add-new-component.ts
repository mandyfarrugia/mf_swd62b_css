import { FormatsService } from './../../services/formats-service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenresService } from '../../services/genres-service';
import { PhysicalRecordDto } from '../../dtos/physical-records-dto';
import { PhysicalRecordsApiService } from '../../services/physical-records-api-service';
import { PhysicalRecordsFrontendService } from '../../services/physical-records-frontend-service';

@Component({
  standalone: true,
  selector: 'records-add-new-component',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './records-add-new-component.html',
  styleUrl: './records-add-new-component.css',
})
export class RecordsAddNewComponent implements OnInit {
  formats: WritableSignal<string[]> = signal<string[]>([]);
  genres: WritableSignal<string[]> = signal<string[]>([]);
  error: WritableSignal<string | null> = signal<string | null>(null);
  addNewRecordForm: FormGroup;

  constructor(private physicalRecordsApiService: PhysicalRecordsApiService, private formatsService: FormatsService, private genresService: GenresService, private physicalRecordsFrontendService: PhysicalRecordsFrontendService, private formBuilder: FormBuilder, private router: Router) {
    this.addNewRecordForm = this.formBuilder.nonNullable.group({
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
    this.loadFormats();
    this.loadGenres();
  }

  private loadFormats(): void {
    this.physicalRecordsFrontendService.getAllFormats(this.formatsService, this.formats, this.error);
  }

  public loadGenres(): void {
    this.physicalRecordsFrontendService.getAllGenres(this.genresService, this.genres, this.error);
  }

  public onSubmit(): void {
    if(!this.addNewRecordForm.valid) return;
    const payload: PhysicalRecordDto = this.addNewRecordForm.getRawValue();
    this.physicalRecordsFrontendService.create(payload, () => this.router.navigate(['/records']), this.error);
  }

  public get formControls() {
    return this.addNewRecordForm.controls;
  }
}
