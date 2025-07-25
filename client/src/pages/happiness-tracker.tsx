import { useState } from 'react';
import { format } from 'date-fns';
import { useHappinessData } from '@/hooks/use-happiness-data';
import { HappinessForm } from '@/components/happiness-form';
import { HappinessChart } from '@/components/happiness-chart';
import { RecentEntries } from '@/components/recent-entries';
import { DataImport } from '@/components/data-import';
import { HappinessEntry } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

export default function HappinessTracker() {
  const {
    entries,
    selectedDate,
    setSelectedDate,
    isLoading,
    saveEntry,
    deleteEntry,
    getEntryForDate,
    getChartData,
    importFromCSV,
  } = useHappinessData();

  const [editingEntry, setEditingEntry] = useState<HappinessEntry | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    await saveEntry(data);
    setEditingEntry(null);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const existingEntry = getEntryForDate(date);
    if (existingEntry) {
      setEditingEntry(existingEntry);
    } else {
      setEditingEntry(null);
    }
  };

  const handleChartPointClick = (date: string) => {
    const entry = getEntryForDate(date);
    if (entry) {
      setSelectedDate(date);
      setEditingEntry(entry);
    }
  };

  const handleEditEntry = (entry: HappinessEntry) => {
    setSelectedDate(entry.date);
    setEditingEntry(entry);
  };

  const handleDeleteEntry = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const success = await deleteEntry(id);
      if (success) {
        toast({
          title: "Entry deleted",
          description: "Your happiness entry has been removed.",
        });
        if (editingEntry?.id === id) {
          setEditingEntry(null);
        }
      }
    }
  };

  const handleExport = () => {
    // Create a simple text export
    const exportData = entries.map(entry => ({
      date: entry.date,
      score: entry.score,
      reflection: entry.reflection || '',
      intention: entry.intention || '',
    }));

    const csvContent = [
      'Date,Score,Reflection,Intention',
      ...exportData.map(row => 
        `"${row.date}","${row.score}","${row.reflection.replace(/"/g, '""')}","${row.intention.replace(/"/g, '""')}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `happiness-tracker-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: "Your happiness data has been downloaded as a CSV file.",
    });
  };

  const currentEntry = editingEntry || getEntryForDate(selectedDate);

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-foreground mb-3">
              Daily Happiness Tracker
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              Track your emotional journey and discover patterns in your well-being
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Happiness Form */}
          <HappinessForm
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            onSubmit={handleSubmit}
            initialData={currentEntry}
            isLoading={isLoading}
          />

          {/* Happiness Chart */}
          <HappinessChart
            data={getChartData()}
            onPointClick={handleChartPointClick}
            onExport={handleExport}
          />

          {/* Recent Entries */}
          <RecentEntries
            entries={entries}
            onEdit={handleEditEntry}
            onDelete={handleDeleteEntry}
          />

          {/* Data Import */}
          <DataImport
            onImport={importFromCSV}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}
