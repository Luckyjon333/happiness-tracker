import { HappinessEntry, InsertHappinessEntry } from '@shared/schema';
import { format, parseISO } from 'date-fns';

const STORAGE_KEY = 'happiness-tracker-entries';

export class HappinessStorage {
  private getStoredEntries(): HappinessEntry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  private saveEntries(entries: HappinessEntry[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }

  getAllEntries(): HappinessEntry[] {
    return this.getStoredEntries().sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  getEntryByDate(date: string): HappinessEntry | undefined {
    const entries = this.getStoredEntries();
    return entries.find(entry => entry.date === date);
  }

  saveEntry(data: InsertHappinessEntry): HappinessEntry {
    const entries = this.getStoredEntries();
    const existingIndex = entries.findIndex(entry => entry.date === data.date);
    
    const now = new Date().toISOString();
    
    if (existingIndex >= 0) {
      // Update existing entry
      const updatedEntry: HappinessEntry = {
        ...entries[existingIndex],
        ...data,
        updatedAt: now,
      };
      entries[existingIndex] = updatedEntry;
      this.saveEntries(entries);
      return updatedEntry;
    } else {
      // Create new entry
      const newEntry: HappinessEntry = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      entries.push(newEntry);
      this.saveEntries(entries);
      return newEntry;
    }
  }

  deleteEntry(id: string): boolean {
    const entries = this.getStoredEntries();
    const filteredEntries = entries.filter(entry => entry.id !== id);
    
    if (filteredEntries.length !== entries.length) {
      this.saveEntries(filteredEntries);
      return true;
    }
    return false;
  }

  getEntriesForChart(): Array<{ date: string; score: number; label: string }> {
    const entries = this.getAllEntries();
    return entries.slice(0, 30).reverse().map(entry => ({
      date: entry.date,
      score: entry.score,
      label: format(parseISO(entry.date), 'MMM d'),
    }));
  }

  importFromCSV(csvContent: string): { success: number; errors: string[] } {
    const lines = csvContent.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      return { success: 0, errors: ['Invalid CSV format: no data rows found'] };
    }

    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim().toLowerCase());
    const requiredHeaders = ['date', 'score'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    
    if (missingHeaders.length > 0) {
      return { success: 0, errors: [`Missing required columns: ${missingHeaders.join(', ')}`] };
    }

    let successCount = 0;
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      try {
        const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
        const row: any = {};
        
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        // Validate and convert data
        const score = parseFloat(row.score);
        if (isNaN(score) || score < 1 || score > 10) {
          errors.push(`Row ${i + 1}: Invalid score "${row.score}" (must be 1-10)`);
          continue;
        }

        // Validate date format
        const dateStr = row.date;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
          errors.push(`Row ${i + 1}: Invalid date format "${dateStr}" (use YYYY-MM-DD)`);
          continue;
        }

        const entryData: InsertHappinessEntry = {
          date: dateStr,
          score: score,
          reflection: row.reflection || '',
          intention: row.intention || '',
        };

        this.saveEntry(entryData);
        successCount++;
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return { success: successCount, errors };
  }
}

export const happinessStorage = new HappinessStorage();
