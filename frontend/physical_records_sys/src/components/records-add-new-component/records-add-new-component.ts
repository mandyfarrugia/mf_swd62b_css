import { FormatsService } from './../../services/formats-service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenresService } from '../../services/genres-service';
import { PhysicalRecordDto } from '../../dtos/physical-records-dto';
import { PhysicalRecordsService } from '../../services/physical-records-service';

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
  addNewRecordForm: FormGroup;

  constructor(private physicalRecordsService: PhysicalRecordsService, private formatsService: FormatsService, private genresService: GenresService, private formBuilder: FormBuilder, private router: Router) {
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
  }

  public onSubmit(): void {
    if(!this.addNewRecordForm.valid) return;
    const payload: PhysicalRecordDto = this.addNewRecordForm.getRawValue();
    console.log(payload);
    this.physicalRecordsService.createPhysicalRecord(payload).subscribe({
      next: () => this.router.navigate(['/records'])
    });
  }

  public get formControls() {
    return this.addNewRecordForm.controls;
  }
}
