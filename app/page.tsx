import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Layout, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex h-16 w-full items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m8 2 1.88 1.88" />
              <path d="M14.12 3.88 16 2" />
              <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" />
              <path d="M12 20v-9" />
              <path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" />
            </svg>
          </div>
          <span>Bug Tracker</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Log in
          </Link>
          <Link href="/login">
            <Button size="sm" className="rounded-full px-5">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <main className="flex flex-1 flex-col md:flex-row">
        {/* Left: Text Content */}
        <div className="flex flex-1 flex-col justify-center px-6 md:px-10 lg:px-20 xl:px-24">
          <div className="space-y-6 max-w-lg">
            <div className="inline-flex items-center rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              v1.0 Available Now
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Ship software <br className="hidden md:block" />
              <span className="text-primary">without bugs.</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              The simplest way to track issues, manage projects, and ship faster.
              No bloat, just the features you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login">
                <Button size="lg" className="h-12 w-full sm:w-auto rounded-full px-8 text-base">
                  Start for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 w-full sm:w-auto rounded-full px-8 text-base"
                >
                  View Demo
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Free for teams</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Open Source</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="relative flex flex-1 items-center justify-center bg-muted/20 p-6 md:p-10 overflow-hidden">
          {/* Background Decor */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30" />

          {/* Floating Cards Mockup */}
          <div className="relative w-full max-w-lg aspect-square md:aspect-auto md:h-[80%]">
            {/* Card 1: Kanban Column */}
            <div className="absolute top-10 left-0 w-64 bg-background rounded-xl border shadow-xl p-4 animate-float" style={{ animationDelay: '0s' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm">To Do</span>
                <span className="text-xs bg-muted px-2 py-0.5 rounded">3</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-secondary/30 rounded-lg space-y-2">
                  <div className="h-2 w-3/4 bg-muted-foreground/20 rounded" />
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-4 bg-orange-500/20 rounded-full" />
                    <div className="h-4 w-4 bg-muted-foreground/20 rounded-full" />
                  </div>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg space-y-2">
                  <div className="h-2 w-1/2 bg-muted-foreground/20 rounded" />
                </div>
              </div>
            </div>

            {/* Card 2: Main Ticket - Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-background rounded-xl border shadow-2xl p-5 z-10 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-1 rounded-md bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium">High Priority</span>
                <span className="px-2 py-1 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-medium">Bug</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Fix login authentication overflow</h3>
              <p className="text-sm text-muted-foreground mb-4">Users are reporting issues when logging in from mobile devices on iOS.</p>
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-slate-200 border-2 border-background" />
                  <div className="h-6 w-6 rounded-full bg-slate-300 border-2 border-background" />
                </div>
                <Button size="sm" variant="ghost" className="h-7 text-xs">View Issue</Button>
              </div>
            </div>

            {/* Card 3: Stats - Right */}
            <div className="absolute bottom-20 right-0 w-56 bg-background rounded-xl border shadow-xl p-4 animate-float" style={{ animationDelay: '2s' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <Layout className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Velocity</div>
                  <div className="font-bold">+24%</div>
                </div>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[70%]" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
