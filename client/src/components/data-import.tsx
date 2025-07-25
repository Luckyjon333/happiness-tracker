import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DataImportProps {
  onImport: (csvContent: string) => Promise<{ success: number; errors: string[] }>;
  isLoading?: boolean;
}

export function DataImport({ onImport, isLoading = false }: DataImportProps) {
  const [dragActive, setDragActive] = useState(false);
  const [importResult, setImportResult] = useState<{ success: number; errors: string[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      return;
    }

    try {
      const content = await file.text();
      const result = await onImport(content);
      setImportResult(result);

      if (result.success > 0) {
        toast({
          title: "Import successful",
          description: `${result.success} entries imported successfully.`,
        });
      }

      if (result.errors.length > 0) {
        toast({
          title: "Import completed with warnings",
          description: `${result.success} entries imported, ${result.errors.length} errors occurred.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Failed to read the CSV file. Please check the file format.",
        variant: "destructive",
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-medium text-foreground mb-4">Import Data</h2>
      
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p className="mb-2">Upload a CSV file with your happiness data. Required columns:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Date</strong> (YYYY-MM-DD format)</li>
            <li><strong>Score</strong> (1-10)</li>
            <li>Reflection (optional)</li>
            <li>Intention (optional)</li>
          </ul>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Drop your CSV file here
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or click to browse your files
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={openFileDialog}
            disabled={isLoading}
            className="mx-auto"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isLoading ? 'Importing...' : 'Choose File'}
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleInputChange}
          className="hidden"
        />

        {importResult && (
          <div className="mt-4 p-4 rounded-lg border">
            <div className="flex items-center mb-2">
              {importResult.success > 0 ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span className="font-medium">
                {importResult.success > 0 
                  ? `Successfully imported ${importResult.success} entries`
                  : 'Import failed'
                }
              </span>
            </div>
            
            {importResult.errors.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-red-700 mb-2">
                  Errors ({importResult.errors.length}):
                </p>
                <ul className="text-sm text-red-600 space-y-1 max-h-32 overflow-y-auto">
                  {importResult.errors.slice(0, 5).map((error, index) => (
                    <li key={index} className="text-xs">• {error}</li>
                  ))}
                  {importResult.errors.length > 5 && (
                    <li className="text-xs italic">
                      ... and {importResult.errors.length - 5} more errors
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}