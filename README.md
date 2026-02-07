# Bug Tracker

A professional issue tracking and project management tool designed for high-performance engineering teams. Built with Next.js 15, Supabase, and Tailwind CSS.

**Live Demo:** [https://bug-tracker-project-rho.vercel.app](https://bug-tracker-project-rho.vercel.app)

## Overview

Bug Tracker is a modern, single-page application that streamlines the software development lifecycle. It enables teams to manage projects, track issues, and collaborate in real-time without the bloat of legacy enterprise tools.

## Key Features

- **Project Management**: Create and manage multiple projects with dedicated workspaces.
- **Kanban Board**: Drag-and-drop interface for visual workflow management (To Do, In Progress, Done).
- **Issue Tracking**: Create detailed tickets with priorities, descriptions, and assignees.
- **Real-Time Collaboration**: Instant updates across all clients using Supabase Realtime.
- **Filtering & Search**: Advanced filtering by status, priority, and text search.
- **Secure Authentication**: Robust user authentication and Row Level Security (RLS) policies.
- **Responsive Design**: Fully responsive interface optimized for desktop and mobile.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend & Auth**: Supabase
- **State Management**: Server Actions, React Hooks
- **Drag & Drop**: dnd-kit

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adityanarayan26/Bug-tracker-Project-.git
   cd Bug-tracker-Project-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application is optimized for deployment on Vercel.

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables in Vercel project settings.
4. Deploy.

## License

This project is licensed under the MIT License.
