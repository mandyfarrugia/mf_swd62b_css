import { AuthenticationService } from './../../services/authentication-service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormatsService } from '../../services/formats-service';
import { GenresService } from '../../services/genres-service';
import { PhysicalRecordsService } from '../../services/physical-records-service';

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

  constructor(private currentRoute: ActivatedRoute, private physicalRecordsService: PhysicalRecordsService, private formatsService: FormatsService, private genresService: GenresService, private formBuilder: FormBuilder) {
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
    this.formatsService.getFormats().subscribe({
      next: (data) => {
        data.unshift('');
        this.formats.set(data);
      },
      error: (error) => console.error(error),
    });

    this.genresService.getGenres().subscribe({
      next: (data) => {
        data.unshift('');
        this.genres.set(data);
      },
      error: (error) => console.error(error)
    });

    this.loadRecord();
  }

  private loadRecord(): void {
    const idFromRequestParameters = Number(this.currentRoute.snapshot.paramMap.get('id'));
    this.physicalRecordsService.getPhysicalRecordById(idFromRequestParameters).subscribe({
      next: (data) => this.editExistingRecordForm.patchValue(data)
    })
  }

  public onSubmit(): void {
  }

  public get formControls() {
    return this.editExistingRecordForm.controls;
  }
}
