import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsAddNewComponent } from './records-add-new-component';

describe('RecordsAddNewComponent', () => {
  let component: RecordsAddNewComponent;
  let fixture: ComponentFixture<RecordsAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordsAddNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordsAddNewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
