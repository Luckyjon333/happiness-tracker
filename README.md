# Daily Happiness Tracker

A minimal, human-centered web app for daily happiness tracking with interactive charts and thoughtful reflection prompts.

## Features

- **Simple Daily Tracking**: Rate your happiness from 1-10 with intuitive slider interface
- **Optional Reflections**: Add thoughts about what contributed to your mood (optional)
- **Future Intentions**: Set intentions for tomorrow (optional)
- **Interactive Charts**: Visualize your happiness journey over time with Chart.js
- **Smart Date Navigation**: Use arrow buttons or date picker to navigate between days
- **Data Export**: Download your data as CSV for analysis
- **Data Import**: Upload CSV files to bulk import happiness data
- **Responsive Design**: Clean, minimal interface that works on all devices

## Built With

- **Frontend**: React 18 + TypeScript, Vite, Wouter (routing)
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Chart.js with react-chartjs-2
- **Backend**: Node.js + Express + TypeScript
- **Data Storage**: Local storage (client-side persistence)
- **Validation**: Zod schemas for type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd happiness-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) in your browser

## Usage

1. **Track Daily Happiness**: Use the slider to select your happiness score (1-10)
2. **Add Context** (Optional): Write about what contributed to your mood
3. **Set Intentions** (Optional): Note what you'd like to try tomorrow
4. **Navigate Dates**: Use arrow buttons or date picker to view/edit different days
5. **View Trends**: Check your happiness chart to see patterns over time
6. **Export Data**: Download your entries as CSV for external analysis
7. **Import Data**: Upload CSV files to bulk import historical data

## Data Format

The app exports/imports CSV files with this format:
- **Date**: YYYY-MM-DD format
- **Score**: Number from 1-10
- **Reflection**: Text (optional)
- **Intention**: Text (optional)

## Deployment

This app is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy with default settings

The app includes:
- Vercel configuration files
- Build scripts for production
- Static file serving setup

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Course Context

This app was created as a tool for sharing a lifetime of wisdom about happiness through simple, actionable daily practices. It's designed to be approachable and non-intimidating for users learning happiness practices for the first time.