import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodJournalComponent } from './mood-journal.component';

describe('MoodJournalComponent', () => {
  let component: MoodJournalComponent;
  let fixture: ComponentFixture<MoodJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodJournalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
