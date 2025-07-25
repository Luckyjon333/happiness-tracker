import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertHappinessEntrySchema, HAPPINESS_DESCRIPTIONS } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, subDays, parseISO } from 'date-fns';

interface HappinessFormProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
  isLoading?: boolean;
}

export function HappinessForm({ 
  selectedDate, 
  onDateChange, 
  onSubmit, 
  initialData,
  isLoading = false 
}: HappinessFormProps) {
  const [currentScore, setCurrentScore] = useState(5);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertHappinessEntrySchema),
    defaultValues: {
      date: selectedDate,
      score: 5,
      reflection: '',
      intention: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        date: initialData.date,
        score: initialData.score,
        reflection: initialData.reflection || '',
        intention: initialData.intention || '',
      });
      setCurrentScore(initialData.score);
    } else {
      form.reset({
        date: selectedDate,
        score: 5,
        reflection: '',
        intention: '',
      });
      setCurrentScore(5);
    }
  }, [initialData, selectedDate, form]);

  const handleScoreChange = (value: number) => {
    setCurrentScore(value);
    form.setValue('score', value);
  };

  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      toast({
        title: "Entry saved!",
        description: "Your happiness entry has been recorded.",
      });
      
      if (!initialData) {
        // Reset form for new entries
        form.reset({
          date: selectedDate,
          score: 5,
          reflection: '',
          intention: '',
        });
        setCurrentScore(5);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score <= 3) return 'bg-red-100 text-red-700';
    if (score <= 5) return 'bg-yellow-100 text-yellow-700';
    if (score <= 7) return 'bg-blue-100 text-blue-700';
    return 'bg-green-100 text-green-700';
  };

  const handlePreviousDay = () => {
    const currentDate = parseISO(selectedDate);
    const previousDay = subDays(currentDate, 1);
    const previousDateString = format(previousDay, 'yyyy-MM-dd');
    onDateChange(previousDateString);
  };

  const handleNextDay = () => {
    const currentDate = parseISO(selectedDate);
    const nextDay = addDays(currentDate, 1);
    const nextDateString = format(nextDay, 'yyyy-MM-dd');
    onDateChange(nextDateString);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-foreground">
          {initialData ? 'Edit Entry' : "Today's Entry"}
        </h2>
        <div className="flex items-center space-x-3">
          <Label htmlFor="date-selector" className="text-sm text-muted-foreground font-medium">
            Date:
          </Label>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePreviousDay}
              className="h-9 w-9 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Input
              id="date-selector"
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-auto"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleNextDay}
              className="h-9 w-9 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Happiness Scale */}
        <div className="space-y-4">
          <Label className="block text-lg font-medium text-foreground">
            How happy do you feel today?
          </Label>
          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              value={currentScore}
              onChange={(e) => handleScoreChange(parseInt(e.target.value))}
              className="happiness-slider w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2 px-3">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
          <div className="text-center">
            <span className={cn(
              'inline-flex items-center px-4 py-2 font-semibold rounded-full text-lg',
              getScoreColor(currentScore)
            )}>
              {currentScore}
            </span>
            <p className="text-muted-foreground mt-2 italic text-sm">
              {HAPPINESS_DESCRIPTIONS[currentScore as keyof typeof HAPPINESS_DESCRIPTIONS]}
            </p>
          </div>
        </div>

        {/* Reflection */}
        <div className="space-y-3">
          <Label htmlFor="reflection" className="block text-lg font-medium text-foreground">
            What contributed to your score today?{' '}
            <span className="text-muted-foreground font-normal">(Optional)</span>
          </Label>
          <Textarea
            id="reflection"
            {...form.register('reflection')}
            rows={4}
            placeholder="Share your thoughts about what influenced your mood today..."
            className="resize-none"
          />
          {form.formState.errors.reflection && (
            <p className="text-sm text-destructive">
              {form.formState.errors.reflection.message}
            </p>
          )}
        </div>

        {/* Intention */}
        <div className="space-y-3">
          <Label htmlFor="intention" className="block text-lg font-medium text-foreground">
            Is there anything you'd like to try or change tomorrow?{' '}
            <span className="text-muted-foreground font-normal">(Optional)</span>
          </Label>
          <Textarea
            id="intention"
            {...form.register('intention')}
            rows={3}
            placeholder="Set an intention for tomorrow..."
            className="resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isLoading ? 'Saving...' : (initialData ? 'Update Entry' : "Save Today's Entry")}
        </Button>
      </form>
    </div>
  );
}
