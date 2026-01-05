import { FormatsService } from './../../services/formats-service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenresService } from '../../services/genres-service';

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

  constructor(private formatsService: FormatsService, private genresService: GenresService, private formBuilder: FormBuilder) {
    this.addNewRecordForm = this.formBuilder.nonNullable.group({
      title: ['', [Validators.required]],
      artist: ['', [Validators.required]],
      format: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      releaseYear: [0, [Validators.required, Validators.min(1948), Validators.max(new Date().getFullYear())]],
      price: [0, [Validators.required, Validators.min(0)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      customerIDNumber: ['', [Validators.required, Validators.pattern(/^0\d{6}[AGHML]$/)]],
      customerFirstName: ['', [Validators.required]],
      customerLastName: ['', [Validators.required]],
      customerContactNumber: ['', [Validators.required, Validators.pattern(/\d{8}/)]],
      customerEmailAddress: ['', [Validators.required, Validators.email]],
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
    console.log('hello');
  }

  public get formControls() {
    return this.addNewRecordForm.controls;
  }
}
