// services/journal.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { JournalEntry } from '../models/journal-entry';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private journalEntriesSignal = signal<JournalEntry[]>([]);
  private streakSignal = signal<number>(0);

  // Computed values
  readonly journalEntries = this.journalEntriesSignal.asReadonly();
  readonly currentStreak = this.streakSignal.asReadonly();

  // Computed property for streak message
  readonly streakMessage = computed(() => {
    const streak = this.streakSignal();
    if (streak >= 7)
      return "Amazing! A whole week of mindfulness. You're building a life-changing habit!";
    if (streak >= 5)
      return 'Fantastic! 5+ days of practice shows real dedication!';
    if (streak >= 3)
      return 'Great job! 3-day streak achieved. Keep the momentum going!';
    if (streak >= 1)
      return "You've started your mindfulness journey. Come back tomorrow!";
    return 'Start your mindfulness streak today!';
  });

  constructor() {
    this.loadFromLocalStorage();
    this.calculateStreak();
  }

  addJournalEntry(
    mood: 'great' | 'good' | 'okay' | 'bad' | 'awful',
    note: string
  ): void {
    const newEntry: JournalEntry = {
      id: Date.now(),
      date: new Date(),
      mood,
      note,
    };

    // Update the signal with new state
    this.journalEntriesSignal.update((entries) => [newEntry, ...entries]);

    this.saveToLocalStorage();
    this.calculateStreak();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(
      'journalEntries',
      JSON.stringify(this.journalEntriesSignal())
    );
  }

  private loadFromLocalStorage(): void {
    const storedEntries = localStorage.getItem('journalEntries');
    if (storedEntries) {
      const entries = JSON.parse(storedEntries).map((entry: any) => ({
        ...entry,
        date: new Date(entry.date),
      }));
      this.journalEntriesSignal.set(entries);
    }
  }

  private calculateStreak(): void {
    const entries = this.journalEntriesSignal();

    if (entries.length === 0) {
      this.streakSignal.set(0);
      return;
    }

    // Sort entries by date (newest first)
    const sortedEntries = [...entries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Check if there's an entry for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const latestEntry = new Date(sortedEntries[0].date);
    latestEntry.setHours(0, 0, 0, 0);

    if (latestEntry.getTime() !== today.getTime()) {
      this.streakSignal.set(0);
      return;
    }

    // Count streak
    let streak = 1;
    let currentDate = today;

    for (let i = 1; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].date);
      entryDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(currentDate);
      expectedDate.setDate(expectedDate.getDate() - 1);

      if (entryDate.getTime() === expectedDate.getTime()) {
        streak++;
        currentDate = expectedDate;
      } else {
        break;
      }
    }

    this.streakSignal.set(streak);
  }
}
