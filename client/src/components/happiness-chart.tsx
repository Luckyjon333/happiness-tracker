import { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartDataPoint {
  date: string;
  score: number;
  label: string;
}

interface HappinessChartProps {
  data: ChartDataPoint[];
  onPointClick?: (date: string) => void;
  onExport?: () => void;
}

export function HappinessChart({ data, onPointClick, onExport }: HappinessChartProps) {
  const chartRef = useRef<ChartJS<"line">>(null);

  const chartData = {
    labels: data.map(point => point.label),
    datasets: [
      {
        label: 'Happiness Score',
        data: data.map(point => point.score),
        borderColor: 'hsl(237, 94%, 70%)',
        backgroundColor: 'hsla(237, 94%, 70%, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'hsl(237, 94%, 70%)',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 3,
        pointRadius: 8,
        pointHoverRadius: 12,
        pointHoverBackgroundColor: 'hsl(170, 60%, 60%)',
        pointHoverBorderColor: '#FFFFFF',
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: 'hsl(237, 94%, 70%)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context: any) => {
            const index = context[0].dataIndex;
            return data[index]?.date || '';
          },
          label: (context: any) => {
            return `Happiness Score: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 1,
        max: 10,
        ticks: {
          stepSize: 1,
          color: 'hsl(215, 13%, 40%)',
          font: {
            family: 'Inter',
            size: 12,
          },
        },
        grid: {
          color: 'hsla(215, 13%, 40%, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'hsl(215, 13%, 40%)',
          font: {
            family: 'Inter',
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    onHover: (event: any, activeElements: any[]) => {
      if (event.native?.target) {
        event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
      }
    },
    onClick: (event: any, activeElements: any[]) => {
      if (activeElements.length > 0 && onPointClick) {
        const index = activeElements[0].index;
        const clickedDate = data[index]?.date;
        if (clickedDate) {
          onPointClick(clickedDate);
        }
      }
    },
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Default export as image
      const chart = chartRef.current;
      if (chart) {
        const url = chart.toBase64Image();
        const link = document.createElement('a');
        link.download = 'happiness-chart.png';
        link.href = url;
        link.click();
      }
    }
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-foreground">Your Happiness Journey</h2>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">No entries yet</p>
            <p className="text-muted-foreground text-sm mt-2">
              Start tracking your happiness to see your journey unfold
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-foreground">Your Happiness Journey</h2>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
      <div className="h-80">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Click on any point to view or edit that day's reflection
        </p>
      </div>
    </div>
  );
}
