import { type HappinessEntry, type InsertHappinessEntry } from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface for happiness entries
// Currently using client-side localStorage, but ready for server-side implementation

export interface IStorage {
  getEntry(id: string): Promise<HappinessEntry | undefined>;
  getEntryByDate(date: string): Promise<HappinessEntry | undefined>;
  getAllEntries(): Promise<HappinessEntry[]>;
  createEntry(entry: InsertHappinessEntry): Promise<HappinessEntry>;
  updateEntry(id: string, entry: Partial<InsertHappinessEntry>): Promise<HappinessEntry | undefined>;
  deleteEntry(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private entries: Map<string, HappinessEntry>;

  constructor() {
    this.entries = new Map();
  }

  async getEntry(id: string): Promise<HappinessEntry | undefined> {
    return this.entries.get(id);
  }

  async getEntryByDate(date: string): Promise<HappinessEntry | undefined> {
    return Array.from(this.entries.values()).find(
      (entry) => entry.date === date,
    );
  }

  async getAllEntries(): Promise<HappinessEntry[]> {
    return Array.from(this.entries.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async createEntry(insertEntry: InsertHappinessEntry): Promise<HappinessEntry> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const entry: HappinessEntry = { 
      ...insertEntry, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.entries.set(id, entry);
    return entry;
  }

  async updateEntry(id: string, updateData: Partial<InsertHappinessEntry>): Promise<HappinessEntry | undefined> {
    const existing = this.entries.get(id);
    if (!existing) return undefined;

    const updated: HappinessEntry = {
      ...existing,
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    this.entries.set(id, updated);
    return updated;
  }

  async deleteEntry(id: string): Promise<boolean> {
    return this.entries.delete(id);
  }
}

export const storage = new MemStorage();
