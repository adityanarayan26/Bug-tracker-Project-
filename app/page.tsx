import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MoveRight,
  Bug,
  CheckCircle2,
  Shield,
  Zap,
  Users,
  BarChart3,
  GitBranch,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
              <Bug className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Labmentix
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Stats</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 bg-grid-pattern opacity-50" />

          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-200" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-400" />

          <div className="container relative z-10 px-4 md:px-8 py-20">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-sm font-medium animate-fade-in-up">
                <Sparkles className="h-4 w-4" />
                <span>Now with AI-powered bug detection</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up animation-delay-200">
                Track bugs.
                <br />
                <span className="text-gradient">Ship faster.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
                The modern issue tracker for teams who build great products.
                Simple, fast, and beautifully designed.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
                <Link href="/login">
                  <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-xl shadow-violet-500/25 group">
                    Start for Free
                    <MoveRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2">
                    See Features
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="pt-8 flex flex-col items-center gap-4 animate-fade-in-up animation-delay-600">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 border-2 border-background flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Trusted by <span className="font-semibold text-foreground">500+</span> development teams worldwide
                </p>
              </div>
            </div>

            {/* Floating UI Mockup */}
            <div className="mt-16 relative max-w-5xl mx-auto animate-float">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
              <div className="rounded-2xl border bg-card/80 backdrop-blur-sm shadow-2xl shadow-violet-500/10 overflow-hidden">
                {/* Mock Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-xs text-muted-foreground">labmentix.app/dashboard</div>
                </div>
                {/* Mock Kanban */}
                <div className="p-6 grid grid-cols-3 gap-4">
                  {['To Do', 'In Progress', 'Done'].map((col, idx) => (
                    <div key={col} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{col}</span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{3 - idx}</span>
                      </div>
                      {Array.from({ length: 3 - idx }).map((_, i) => (
                        <div key={i} className="p-3 rounded-lg bg-muted/50 border space-y-2">
                          <div className="h-3 w-3/4 bg-foreground/10 rounded" />
                          <div className="h-2 w-1/2 bg-foreground/5 rounded" />
                          <div className="flex gap-2">
                            <div className={`h-5 w-12 rounded-full ${idx === 0 ? 'bg-red-500/20' : idx === 1 ? 'bg-yellow-500/20' : 'bg-green-500/20'}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-20 border-y bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '10K+', label: 'Bugs Tracked' },
                { value: '500+', label: 'Teams Active' },
                { value: '99.9%', label: 'Uptime' },
                { value: '< 50ms', label: 'Response Time' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient">{stat.value}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 md:py-32">
          <div className="container px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Everything you need to
                <span className="text-gradient"> ship great software</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Powerful features designed for modern development teams
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: CheckCircle2,
                  title: 'Issue Tracking',
                  description: 'Create, assign, and track bugs with priority levels and custom statuses.',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  icon: GitBranch,
                  title: 'Kanban Board',
                  description: 'Visualize your workflow with drag-and-drop Kanban boards.',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Users,
                  title: 'Team Collaboration',
                  description: 'Invite team members, assign tickets, and collaborate in real-time.',
                  color: 'from-violet-500 to-purple-500'
                },
                {
                  icon: Shield,
                  title: 'Enterprise Security',
                  description: 'Row-level security with Supabase ensures your data stays protected.',
                  color: 'from-orange-500 to-amber-500'
                },
                {
                  icon: Zap,
                  title: 'Real-time Updates',
                  description: 'See changes instantly across all connected clients with live sync.',
                  color: 'from-pink-500 to-rose-500'
                },
                {
                  icon: BarChart3,
                  title: 'Analytics Dashboard',
                  description: 'Track velocity, bug trends, and team performance metrics.',
                  color: 'from-indigo-500 to-violet-500'
                },
              ].map((feature, i) => (
                <Card key={i} className="group relative overflow-hidden border-0 bg-gradient-to-br from-muted/50 to-muted hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-24 md:py-32 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Get started in <span className="text-gradient">3 simple steps</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Go from zero to tracking bugs in under 5 minutes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: '01',
                  title: 'Create a Project',
                  description: 'Set up your project and invite your team members to collaborate.'
                },
                {
                  step: '02',
                  title: 'Add Tickets',
                  description: 'Create bug reports with descriptions, priorities, and assignees.'
                },
                {
                  step: '03',
                  title: 'Track Progress',
                  description: 'Move tickets through your workflow and ship with confidence.'
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  {i < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent" />
                  )}
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-3xl font-bold shadow-xl shadow-violet-500/25">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 md:py-32">
          <div className="container px-4 md:px-8">
            <div className="relative max-w-4xl mx-auto text-center">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 blur-3xl" />

              <div className="relative glass rounded-3xl p-12 md:p-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Ready to squash some bugs?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join hundreds of teams using Labmentix to build better software faster.
                </p>
                <Link href="/login">
                  <Button size="lg" className="h-14 px-10 text-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-xl shadow-violet-500/25 group">
                    Get Started — It's Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                <Bug className="h-4 w-4 text-white" />
              </div>
              <span>Labmentix</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Labmentix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
