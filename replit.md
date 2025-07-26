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

### Frontend-Only Deployment (Updated for Vercel)
- **Architecture**: Static frontend app with localStorage persistence
- **No Backend Required**: All data stored client-side for immediate deployment
- **Vercel Configuration**: Simplified for static site deployment
- **Build Structure**: Client-side build only, no server components

### Project Structure for Deployment
- **Root Repository**: Contains full-stack setup for development
- **Client Directory**: Self-contained frontend app for production deployment
- **Deployment Target**: `client/` directory with its own build configuration

### Build Process
1. **Client Build**: Vite builds optimized React bundle to `client/dist/`
2. **Static Assets**: All assets bundled and optimized for CDN
3. **Single Page App**: Router handled client-side with Wouter
4. **No Server**: Pure static deployment, no serverless functions

### Vercel Configuration
- **Root Directory**: `client` (Vercel builds from this directory)
- **Framework**: Vite (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Configuration
- **Development**: Full-stack setup with Express server for development
- **Production**: Static frontend deployment with localStorage
- **No Database**: Client-side storage eliminates database requirements
- **No Environment Variables**: Self-contained application

### Deployment Features
- **Zero-config deployment**: Works immediately on Vercel
- **Instant setup**: No database or API configuration needed
- **Global CDN**: Static assets served via Vercel's CDN
- **Perfect Lighthouse scores**: Optimized static site performance

### Scalability Considerations
- Static deployment scales infinitely without server costs
- Client-side storage works immediately for any user
- Easy upgrade path to add backend when needed
- Modular structure supports feature additions

### Files Created for Deployment
- `client/package.json` - Frontend-only dependencies
- `client/vite.config.ts` - Production build configuration
- `client/tsconfig.json` - TypeScript configuration
- `client/tailwind.config.ts` - Styling configuration
- `client-build-test.js` - Build verification script

**Status**: Ready for immediate Vercel deployment as static frontend application.