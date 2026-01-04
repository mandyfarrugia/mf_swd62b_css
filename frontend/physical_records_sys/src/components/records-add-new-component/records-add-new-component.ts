import { FormatsService } from './../../services/formats-service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'records-add-new-component',
  imports: [RouterModule],
  templateUrl: './records-add-new-component.html',
  styleUrl: './records-add-new-component.css',
})
export class RecordsAddNewComponent implements OnInit {
  formats: WritableSignal<string[]> = signal<string[]>([]);

  constructor(private formatsService: FormatsService) {}

  ngOnInit(): void {
    this.formatsService.getFormats().subscribe({
      next: (data) => {
        data.unshift("");
        this.formats.set(data);
      },
      error: (error) => console.error(error)
    });
  }
}
