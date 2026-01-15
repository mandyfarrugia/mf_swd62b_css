import { CellHookData, UserOptions } from './../../../node_modules/jspdf-autotable/dist/index.d';
import { GenreColourCodingService } from './../../services/genre-colour-coding-service';
import { AuthenticationService } from '../../services/authentication-service';
import { RouterModule } from '@angular/router';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { PhysicalRecordsApiService } from '../../services/physical-records-api-service';
import { PhysicalRecordDto } from '../../dtos/physical-records-dto';
import { AlertService } from '../../services/alert-service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { PhysicalRecordsFrontendService } from '../../services/physical-records-frontend-service';
import { recordDeletedNotification } from '../../shared/alert-options';
import { RecordTableRowComponent } from "../record-table-row-component/record-table-row-component";
import { AuthorisationService } from '../../services/authorisation-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'records-list-component',
  imports: [RouterModule, RecordTableRowComponent, RecordTableRowComponent],
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
  physicalRecords: WritableSignal<PhysicalRecordDto[]> = signal<PhysicalRecordDto[]>([]);
  error: WritableSignal<string | null> = signal<string | null>(null);

  constructor(
    private genreColourCodingService: GenreColourCodingService,
    private alertService: AlertService,
    private authorisationService: AuthorisationService,
    private physicalRecordsApiService : PhysicalRecordsApiService) {}

  ngOnInit(): void {
    this.loadPhysicalRecords();
  }

  public get authorisationService$() {
    return this.authorisationService;
  }

  private loadPhysicalRecords() : void {
    this.physicalRecordsApiService.getPhysicalRecords().subscribe({
      next: (data) => this.physicalRecords.set(data),
      error: (httpError: HttpErrorResponse) => {
        this.error.set(httpError?.error?.message ?? httpError?.message);
        console.error(httpError);
      }
    });
  }

  private mapRecordsToColumns(records: PhysicalRecordDto[]) : (string | number)[][] {
    return records.map(record => ([
      record.id ?? 'No ID found!',
      record.title,
      record.artist,
      record.genre,
      record.format,
      record.price.toLocaleString('en-GB', { style: 'currency', currency: 'EUR' }),
      record.stockQty,
      record.customerId,
      record.customerFirstName,
      record.customerLastName,
      record.customerContact,
      record.customerEmail
    ]));
  }

  public exportRecordsToPDF() {
    const document: jsPDF = new jsPDF({ orientation: 'landscape', format: 'a4' });

    const pdfExportOptions: UserOptions = {
      head: [['Record ID', 'Title', 'Artist', 'Genre', 'Format', 'Price', 'Stock', 'Customer ID', 'Forename', 'Surname', 'Contact Number', 'Email']],
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
    document.save('pdf-export.pdf');
  }

  public exportRecordsToExcel() {
    const workbook : ExcelJS.Workbook = new ExcelJS.Workbook();
    const sheet: ExcelJS.Worksheet = workbook.addWorksheet('Exported Records');

    sheet.columns = [
      { header: 'Record ID', key: 'id', width: 15 },
      { header: 'Title', key: 'title', width: 25 },
      { header: 'Artist', key: 'artist', width: 25 },
      { header: 'Genre', key: 'genre', width: 15 },
      { header: 'Format', key: 'format', width: 15 },
      { header: 'Stock Available', key: 'stockQty', width: 15 },
      { header: 'Price', key: 'price', width: 15 },
      { header: 'Customer ID', key: 'customerId', width: 15 },
      { header: 'Forename', key: 'customerFirstName', width: 15 },
      { header: 'Surname', key: 'customerLastName', width: 15 },
      { header: 'Contact Number', key: 'customerContact', width: 15 },
      { header: 'Email', key: 'customerEmail', width: 45 },
    ];

    sheet.getRow(1).font = { bold: true };

    this.physicalRecords().forEach(record => {
      const recordRows: ExcelJS.Row = sheet.addRow({
        id: record.id,
        title: record.title,
        artist: record.artist,
        genre: record.genre,
        format: record.format,
        stockQty: record.stockQty,
        price: record.price,
        customerId: record.customerId,
        customerFirstName: record.customerFirstName,
        customerLastName: record.customerLastName,
        customerContact: record.customerContact,
        customerEmail: record.customerEmail
    });

      const backgroundColourBasedOnGenre = this.genreColourCodingService.getArgbBackgroundHexColourForGenre(record?.genre.toLocaleLowerCase()).replace('#', '');
      const foregroundColourBasedOnGenre = this.genreColourCodingService.getArgbForegroundHexColourForGenre(record?.genre.toLocaleLowerCase()).replace('#', '');

      if(backgroundColourBasedOnGenre && foregroundColourBasedOnGenre) {
        recordRows.eachCell(cell => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: backgroundColourBasedOnGenre }
          },
          cell.font = {
            color: { argb: foregroundColourBasedOnGenre }
          }
        });
      }
    });

    sheet.getColumn('price').numFmt = '€#,##0.00';

    workbook.xlsx.writeBuffer().then(buffer => {
      const blob: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'excel-export.xlsx');
    });
  }

  public onRecordDeleted(deletedId: number) {
    /* Update the signal by filtering by records whose IDs do not match that of the deleted entity.
     * This ensures the list of records is refreshed without calling the backend again. */
    this.physicalRecords.update(records => records.filter(record => record.id !== deletedId));
    this.alertService.showAlert(recordDeletedNotification);
  }
}
