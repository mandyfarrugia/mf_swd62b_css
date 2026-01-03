import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordIndividualViewComponent } from './record-individual-view-component';

describe('RecordIndividualViewComponent', () => {
  let component: RecordIndividualViewComponent;
  let fixture: ComponentFixture<RecordIndividualViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordIndividualViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordIndividualViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
