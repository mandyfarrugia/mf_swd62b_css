import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsEditComponent } from './records-edit-component';

describe('RecordsEditComponent', () => {
  let component: RecordsEditComponent;
  let fixture: ComponentFixture<RecordsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordsEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
