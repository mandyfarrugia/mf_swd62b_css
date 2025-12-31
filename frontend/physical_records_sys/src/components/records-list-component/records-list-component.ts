import { Component, OnInit } from '@angular/core';
import { PhysicalRecordsService } from '../../services/physical-records-service';
import { PhysicalRecordDto } from '../../dtos/physical-records-dto';

@Component({
  selector: 'records-list-component',
  imports: [],
  templateUrl: './records-list-component.html',
  styleUrl: './records-list-component.css',
})
export class RecordsListComponent implements OnInit {
  ngOnInit(): void {
    this.loadPhysicalRecords();
  }

  protected physicalRecords : PhysicalRecordDto[] = [];

  public getPhysicalRecords() : PhysicalRecordDto[] {
    return this.physicalRecords;
  }

  constructor(private physicalRecordsService : PhysicalRecordsService) {}

  loadPhysicalRecords() : void {
    this.physicalRecordsService.getPhysicalRecords().subscribe({
      next: (data) => {
        this.physicalRecords = data;
      }
    });
  }
}