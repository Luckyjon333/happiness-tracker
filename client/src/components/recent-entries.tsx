import { format, parseISO } from 'date-fns';
import { HappinessEntry } from '@shared/schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface RecentEntriesProps {
  entries: HappinessEntry[];
  onEdit?: (entry: HappinessEntry) => void;
  onDelete?: (id: string) => void;
}

export function RecentEntries({ entries, onEdit, onDelete }: RecentEntriesProps) {
  const getScoreColor = (score: number) => {
    if (score <= 3) return 'bg-red-100 text-red-700';
    if (score <= 5) return 'bg-yellow-100 text-yellow-700';
    if (score <= 7) return 'bg-blue-100 text-blue-700';
    return 'bg-green-100 text-green-700';
  };

  const formatEntryDate = (dateString: string) => {
    const date = parseISO(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
      return 'Today';
    } else if (format(date, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-medium text-foreground mb-6">Recent Entries</h2>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No entries yet</p>
          <p className="text-muted-foreground text-sm mt-1">
            Your recent happiness entries will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-medium text-foreground mb-6">Recent Entries</h2>
      <div className="space-y-4">
        {entries.slice(0, 5).map((entry) => (
          <div
            key={entry.id}
            className="entry-card bg-gray-50 rounded-xl p-4 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">
                {formatEntryDate(entry.date)}
              </span>
              <div className="flex items-center space-x-2">
                <span
                  className={cn(
                    'inline-flex items-center px-3 py-1 font-semibold rounded-full text-sm',
                    getScoreColor(entry.score)
                  )}
                >
                  {entry.score}
                </span>
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(entry)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(entry.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <p className="text-foreground mb-2 text-sm">{entry.reflection}</p>
            {entry.intention && (
              <p className="text-sm text-muted-foreground italic">
                {entry.intention}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
