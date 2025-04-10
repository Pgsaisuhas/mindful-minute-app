// components/journal/mood-journal/mood-journal.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JournalService } from '../../../services/journal.service';

@Component({
  selector: 'app-mood-journal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="row mb-4">
        <div class="col">
          <h1>Mood Journal</h1>
          <p class="lead">
            Track your daily moods and reflect on your emotional well-being
          </p>
        </div>
      </div>

      <!-- Streak Counter -->
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card bg-light border-0">
            <div class="card-body text-center">
              <h3>
                Your Streak: {{ journalService.currentStreak() }} day{{
                  journalService.currentStreak() !== 1 ? 's' : ''
                }}
              </h3>
              <p>{{ journalService.streakMessage() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- New Entry Form -->
      <div class="row mb-5">
        <div class="col-md-8 mx-auto">
          <div class="card shadow-sm">
            <div class="card-header bg-light">
              <h2 class="h5 mb-0">How are you feeling today?</h2>
            </div>
            <div class="card-body">
              <form (ngSubmit)="addEntry()" #journalForm="ngForm">
                <div class="mb-3">
                  <label class="form-label">Select your mood</label>
                  <div class="d-flex justify-content-between">
                    @for (mood of moods; track mood) {
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="mood"
                        [id]="mood"
                        [value]="mood"
                        [(ngModel)]="newEntry.mood"
                        required
                      />
                      <label class="form-check-label" [for]="mood">
                        {{ getMoodEmoji(mood) }} {{ mood }}
                      </label>
                    </div>
                    }
                  </div>
                </div>

                <div class="mb-3">
                  <label for="journalNote" class="form-label"
                    >Journal Note</label
                  >
                  <textarea
                    class="form-control"
                    id="journalNote"
                    rows="3"
                    placeholder="What's on your mind today?"
                    [(ngModel)]="newEntry.note"
                    name="note"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary"
                  [disabled]="!journalForm.form.valid"
                >
                  Save Entry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Journal Entry List -->
      <div class="row">
        <div class="col-md-10 mx-auto">
          <h3 class="mb-3">Previous Entries</h3>

          @if (journalService.journalEntries().length === 0) {
          <p class="text-center text-muted">
            No journal entries yet. Start tracking your mood today!
          </p>
          } @else { @for (entry of journalService.journalEntries(); track
          entry.id) {
          <div class="card mb-3 shadow-sm">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <span>{{ entry.date | date : 'medium' }}</span>
              <span class="badge bg-light text-dark"
                >{{ getMoodEmoji(entry.mood) }} {{ entry.mood }}</span
              >
            </div>
            <div class="card-body">
              <p class="card-text">{{ entry.note }}</p>
            </div>
          </div>
          } }
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./mood-journal.component.css'],
})
export class MoodJournalComponent {
  journalService = inject(JournalService);

  moods: ('great' | 'good' | 'okay' | 'bad' | 'awful')[] = [
    'great',
    'good',
    'okay',
    'bad',
    'awful',
  ];

  newEntry: {
    mood: 'great' | 'good' | 'okay' | 'bad' | 'awful';
    note: string;
  } = {
    mood: 'good',
    note: '',
  };

  getMoodEmoji(mood: string): string {
    switch (mood) {
      case 'great':
        return '😁';
      case 'good':
        return '🙂';
      case 'okay':
        return '😐';
      case 'bad':
        return '🙁';
      case 'awful':
        return '😢';
      default:
        return '❓';
    }
  }

  addEntry(): void {
    if (this.newEntry.mood && this.newEntry.note) {
      this.journalService.addJournalEntry(
        this.newEntry.mood,
        this.newEntry.note
      );
      // Reset form
      this.newEntry = {
        mood: 'good',
        note: '',
      };
    }
  }
}
