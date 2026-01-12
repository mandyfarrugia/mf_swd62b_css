import { CellHookData, UserOptions } from './../../../node_modules/jspdf-autotable/dist/index.d';
import { GenreColourCodingService } from './../../services/genre-colour-coding-service';
import { AuthenticationService } from '../../services/authentication-service';
import { RouterModule } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { PhysicalRecordsService } from '../../services/physical-records-service';
import { PhysicalRecordDto } from '../../dtos/physical-records-dto';
import { FallbackValuePipe } from '../../pipes/fallback-value-pipe';
import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { AlertService } from '../../services/alert-service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Title } from '@angular/platform-browser';
import { pattern } from '@angular/forms/signals';

@Component({
  standalone: true,
  selector: 'records-list-component',
  imports: [RouterModule, FallbackValuePipe],
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
  canViewRecords : boolean = false;
  canAddRecords : boolean = false;
  canUpdateRecords : boolean = false;
  canDeleteRecords : boolean = false;

  constructor(
    private genreColourCodingService: GenreColourCodingService,
    private alertService: AlertService,
    private authenticationService : AuthenticationService,
    private physicalRecordsService : PhysicalRecordsService) {}

  ngOnInit(): void {
    this.loadPhysicalRecords();
    this.canViewRecords = this.authenticationService.canViewRecords();
    this.canAddRecords = this.authenticationService.canAddRecords();
    this.canUpdateRecords = this.authenticationService.canUpdateRecords();
    this.canDeleteRecords = this.authenticationService.canDeleteRecords();
  }

  private loadPhysicalRecords() : void {
    this.physicalRecordsService.getPhysicalRecords().subscribe({
      next: (data) => this.physicalRecords.set(data),
      error: (error) => console.log(error)
    });
  }

  private mapRecordsToColumns(records: PhysicalRecordDto[]) : (string | number)[][] {
    return records.map(record => ([
      record.id ?? 'No ID found!',
      record.title,
      record.artist,
      record.genre,
      record.format,
      record.price,
      record.stockQty
    ]));
  }

  public exportRecordsToPDF() {
    const document: jsPDF = new jsPDF();

    const pdfExportOptions: UserOptions = {
      head: [['Record ID', 'Title', 'Artist', 'Genre', 'Format', 'Price', 'Stock']],
      body: this.mapRecordsToColumns(this.physicalRecords()),
      didParseCell: (data: CellHookData) => {
        if(data.section === 'body') {
          const record = this.physicalRecords().at(data.row.index);
          const backgroundColour = this.genreColourCodingService.getBackgroundHexColourForGenre(record?.genre);
          data.cell.styles.fillColor = backgroundColour;
          data.cell.styles.textColor = this.genreColourCodingService.getForegroundHexColourForGenre(record?.genre);
        }
      }
    };

    autoTable(document, pdfExportOptions);
    document.save('export.pdf');
  }

  public exportRecordsToExcel() {
    const workbook : ExcelJS.Workbook = new ExcelJS.Workbook();
    const sheet: ExcelJS.Worksheet = workbook.addWorksheet('Exported Records');

    sheet.columns = [
      { header: 'Record ID', key: 'id', width: 8 },
      { header: 'Title', key: 'title', width: 25 },
      { header: 'Artist', key: 'artist', width: 25 },
      { header: 'Genre', key: 'genre', width: 15 },
      { header: 'Format', key: 'format', width: 15 },
      { header: 'Stock Available', key: 'stockQty', width: 10 },
      { header: 'Price', key: 'price', width: 15 }
    ];

    this.physicalRecords().forEach(record => {
      const recordRows: ExcelJS.Row = sheet.addRow({
        id: record.id,
        title: record.title,
        artist: record.artist,
        genre: record.genre,
        format: record.format,
        stockQty: record.stockQty,
        price: record.price
      });

      const backgroundColourBasedOnGenre = this.genreColourCodingService.getArgbBackgroundHexColourForGenre(record?.genre.toLocaleLowerCase()).replace('#', '');
      const foregroundColourBasedOnGenre = this.genreColourCodingService.getArgbForegroundHexColourForGenre(record?.genre.toLocaleLowerCase()).replace('#', '');

      if(backgroundColourBasedOnGenre && foregroundColourBasedOnGenre) {
        recordRows.eachCell(cell => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: backgroundColourBasedOnGenre }
          }
        });
      }
    });

    workbook.xlsx.writeBuffer().then(buffer => {
      const blob: Blob = new Blob([buffer], { type: 'application/octet-stream' });
      saveAs(blob, 'records.xlsx');
    });
  }

  public deletePhysicalRecord(id: number): void {
    const baseAlertOptions: SweetAlertOptions = {
      confirmButtonColor: '#5dc932ff',
      cancelButtonColor: '#c51414ff'
    };

    const confirmDeleteOptions: SweetAlertOptions = {
      title: 'Confirm deletion',
      text: 'Are you sure you want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      ...baseAlertOptions,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it!'
    };

    const confirmDeletion: Promise<SweetAlertResult> = this.alertService.showAlert(confirmDeleteOptions);

    confirmDeletion.then((result) => {
      if (result.isConfirmed) {
        this.physicalRecordsService.deletePhysicalRecord(id).subscribe({
          next: () => {
            this.loadPhysicalRecords();

            const recordDeletedNotification: SweetAlertOptions = {
              title: 'Record deleted successfully!',
              text: 'The physical record has been deleted.',
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: baseAlertOptions.confirmButtonColor,
              confirmButtonText: 'OK'
            }

            this.alertService.showAlert(recordDeletedNotification);
          }
        });
      }
    });
  }
}
