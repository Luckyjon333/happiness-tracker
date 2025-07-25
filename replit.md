# Happiness Tracker MVP

## Overview

This is a web-based happiness tracker application built with a modern full-stack architecture. The app allows users to reflect on their emotional well-being by recording daily happiness scores (1-10), reflections, and intentions. It features a clean, minimal design with real-time data visualization using Chart.js.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter (lightweight React router)
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks with custom data management layer
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation
- **Charts**: Chart.js with react-chartjs-2 wrapper

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (configured but currently using in-memory storage)
- **Session Management**: Connect-pg-simple for PostgreSQL sessions
- **Development**: Hot reloading with Vite integration

### Data Storage Solutions
Currently implements a dual-storage approach:
- **Development**: In-memory storage using Map-based implementation
- **Production Ready**: Drizzle ORM with PostgreSQL support (Neon Database)
- **Client Storage**: Local storage for persistence in current implementation

## Key Components

### Core Features
1. **Daily Happiness Tracking**: 
   - 1-10 scale with descriptive labels
   - Reflection text input
   - Optional intention setting
   - Date selection capability

2. **Data Visualization**:
   - Real-time line chart showing happiness trends
   - Interactive chart with clickable data points
   - Export functionality for data analysis

3. **Entry Management**:
   - View recent entries
   - Edit existing entries
   - Delete entries with confirmation

### UI Components
- **HappinessForm**: Main input form with validation
- **HappinessChart**: Chart.js visualization component
- **RecentEntries**: List view of past entries
- **shadcn/ui**: Complete UI component library (buttons, forms, dialogs, etc.)

### Data Layer
- **HappinessStorage**: Local storage abstraction
- **useHappinessData**: Custom hook for data operations
- **Schema Validation**: Zod schemas for type safety

## Data Flow

1. **Entry Creation**:
   - User fills form with happiness score, reflection, and optional intention
   - Form validation using Zod schemas
   - Data saved to local storage (current) or database (when connected)
   - Chart updates in real-time

2. **Data Visualization**:
   - Entries retrieved from storage
   - Transformed for Chart.js consumption
   - Interactive chart allows editing via click events

3. **Entry Management**:
   - Recent entries displayed with edit/delete actions
   - Updates reflect immediately across all components

## External Dependencies

### Core Libraries
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Framework**: Radix UI primitives, Tailwind CSS
- **Data Visualization**: Chart.js, react-chartjs-2
- **Validation**: Zod with Drizzle-Zod integration
- **Date Handling**: date-fns for formatting and manipulation
- **State Management**: TanStack Query for server state

### Development Tools
- **Build**: Vite with React plugin
- **Database**: Drizzle Kit for migrations and schema management
- **TypeScript**: Full type safety across frontend and backend
- **Development**: Runtime error overlay, Replit integration

### Database Integration
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Connection**: Environment-based configuration

## Deployment Strategy

### GitHub and Vercel Setup
- **Repository**: Ready for GitHub with proper `.gitignore` and documentation
- **Vercel Configuration**: `vercel.json` configured for serverless deployment
- **Build Process**: Automated via Vercel with `npm run build`
- **Documentation**: Complete deployment guide in `DEPLOYMENT.md`

### Build Process
1. **Frontend**: Vite builds optimized React bundle to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Static Serving**: Frontend served as static files on Vercel
4. **API Routes**: Backend runs as Vercel serverless functions

### Environment Configuration
- **Development**: `NODE_ENV=development` with hot reloading
- **Production**: Vercel handles production environment automatically
- **Storage**: Currently uses localStorage (client-side persistence)
- **Database**: Ready for PostgreSQL integration when needed

### Deployment Features
- **Zero-config deployment**: Works out of the box on Vercel
- **Automatic builds**: Triggered on GitHub pushes
- **CDN optimization**: Static assets served via Vercel's global CDN
- **Serverless functions**: Backend scales automatically

### Scalability Considerations
- Serverless architecture scales to zero and up automatically
- Client-side storage allows immediate deployment without database setup
- Modular architecture supports easy feature additions
- Ready for database integration (Neon, PlanetScale, etc.)

The application is production-ready for immediate deployment on Vercel with GitHub integration.