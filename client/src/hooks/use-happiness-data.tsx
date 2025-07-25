import { useState, useEffect, useCallback } from 'react';
import { HappinessEntry, InsertHappinessEntry } from '@shared/schema';
import { happinessStorage } from '@/lib/happiness-storage';
import { format } from 'date-fns';

export function useHappinessData() {
  const [entries, setEntries] = useState<HappinessEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [isLoading, setIsLoading] = useState(false);

  const loadEntries = useCallback(() => {
    const allEntries = happinessStorage.getAllEntries();
    setEntries(allEntries);
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const saveEntry = useCallback(async (data: InsertHappinessEntry) => {
    setIsLoading(true);
    try {
      const savedEntry = happinessStorage.saveEntry(data);
      loadEntries();
      return savedEntry;
    } finally {
      setIsLoading(false);
    }
  }, [loadEntries]);

  const deleteEntry = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const success = happinessStorage.deleteEntry(id);
      if (success) {
        loadEntries();
      }
      return success;
    } finally {
      setIsLoading(false);
    }
  }, [loadEntries]);

  const getEntryForDate = useCallback((date: string) => {
    return happinessStorage.getEntryByDate(date);
  }, []);

  const getChartData = useCallback(() => {
    return happinessStorage.getEntriesForChart();
  }, []);

  const importFromCSV = useCallback(async (csvContent: string) => {
    setIsLoading(true);
    try {
      const result = happinessStorage.importFromCSV(csvContent);
      loadEntries();
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [loadEntries]);

  return {
    entries,
    selectedDate,
    setSelectedDate,
    isLoading,
    saveEntry,
    deleteEntry,
    getEntryForDate,
    getChartData,
    importFromCSV,
    refreshEntries: loadEntries,
  };
}
