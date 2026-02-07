# Technology Stack Overview: Bug Tracker / Issue Tracker

This document outlines the architectural decisions for switching the Bug Tracker application to **Next.js (App Router)** and **Supabase**.

## 🚀 The Core Stack

### 1. Framework: Next.js 15+ (App Router)
We are choosing Next.js with the App Router over a traditional React SPA (Single Page Application) for several key reasons:

*   **Server Components (`RSC`)**: We can fetch data directly on the server (e.g., fetching tickets from Supabase) without exposing sensitive API logic or needing complex `useEffect` chains. This reduces the client-side JavaScript bundle size significantly.
*   **Server Actions**: Instead of setting up a separate Express API backend, we can write functions that execute on the server directly from our UI components (e.g., `<form action={createTicket}>`). This simplifies the "API" layer into direct function calls.
*   **Routing & Layouts**: The App Router's nested layouts are perfect for a dashboard application (e.g., keeping the Sidebar and Topbar persistent while the main content changes).

### 2. Backend-as-a-Service: Supabase
For a Bug Tracker, data integrity and relationships are paramount. Supabase (built on PostgreSQL) offers significant advantages over Firebase (NoSQL):

*   **Relational Data (PostgreSQL)**: a Bug Tracker relies on strict relationships:
    *   `Project` has many `Tickets`.
    *   `Ticket` belongs to `User` (Assignee) and `Project`.
    *   `Ticket` has many `Comments`.
    *   *Supabase allows us to model these relationships strictly with Foreign Keys, ensuring data consistency (e.g., you can't assign a ticket to a non-existent user).*
*   **Complex Filtering**: We need to query tickets like: *"Show me all 'High' priority tickets in 'Project A' assigned to 'User B' that are 'In Progress'"*. SQL is optimized for this. NoSQL requires complex composite indexes for every permutation.
*   **Row Level Security (RLS)**: We can define security policies directly in the database.
    *   *Example Policy:* `CREATE POLICY "Users can only view projects they are members of" ...`
    *   This ensures that no matter how we fetch data (Client or Server), the rules are always enforced.
*   **Built-in Auth & Storage**: Supabase Auth integrates seamlessly with RLS. Storage will be used for ticket attachments (screenshots).

## 🏗️ Architecture Comparison

| Feature | Old Stack (MERN) | New Stack (Next.js + Supabase) | Benefit |
| :--- | :--- | :--- | :--- |
| **Backend** | Express + Node.js | Next.js Server Actions | No need to maintain a separate server process. |
| **Database** | MongoDB (NoSQL) | Supabase (PostgreSQL) | Native joins and strict schema validation. |
| **Auth** | Manual (BCrypt + JWT) | Supabase Auth | Secure, battle-tested, handles email confirm/pass reset. |
| **API** | REST Endpoints | Server Actions | Type-safe, direct calls. No manual fetch/axios overhead. |
| **Realtime** | Socket.io | Supabase Realtime | "Subscribe" to table changes with one line of code. |

## 📦 Key Libraries
*   **`@supabase/ssr`**: For handling Auth cookies correctly in Next.js Server Components.
*   **`shadcn/ui` + `Tailwind CSS`**: For a premium, accessible component library.
*   **`zod`**: For strict validation of form data (creating tickets/projects) before it hits the DB.
