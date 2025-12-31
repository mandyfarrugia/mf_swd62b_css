import { Component, OnInit, signal } from '@angular/core';
import { PhysicalRecordsService } from '../../services/physical-records-service';
import { PhysicalRecordDto } from '../../dtos/physical-records-dto';
import { FallbackValuePipe } from '../../pipes/fallback-value-pipe';

@Component({
  selector: 'records-list-component',
  imports: [ FallbackValuePipe ],
  templateUrl: './records-list-component.html',
  styleUrl: './records-list-component.css',
})
export class RecordsListComponent implements OnInit {
  /* This signal holds an array of PhysicalRecordDto instances, initially starting off as an empty array.
   * Signals are reactive, thus when set() is invoked within the signal,
   * the signal will notify Angular that the state has changed (change detection is triggered)
   * and the DOM is updated accordingly. In this case, render a table row for each physical record.
   * In the HTML template, the value is read via physicalRecords().
   * Simply using physicalRecords will cause the following error:
   * TS2488: Type 'WritableSignal<PhysicalRecordDto[]>' must have a '[Symbol.iterator]()' method that returns an iterator. */
  physicalRecords = signal<PhysicalRecordDto[]>([]);

  constructor(private physicalRecordsService : PhysicalRecordsService) {}

  ngOnInit(): void {
    this.loadPhysicalRecords();
  }

  loadPhysicalRecords() : void {
    this.physicalRecordsService.getPhysicalRecords().subscribe({
      next: (data) => {
        console.log(data)
        this.physicalRecords.set(data);
      }
    });
  }
}