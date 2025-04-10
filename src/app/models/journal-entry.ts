export interface JournalEntry {
  id: number;
  date: Date;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'awful';
  note: string;
}
