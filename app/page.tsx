import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveRight, Bug, CheckCircle2, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl pl-4">
            <Bug className="h-6 w-6 text-primary" />
            <span>Labmentix</span>
          </div>
          <div className="pr-4">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container flex flex-col items-center justify-center space-y-10 py-24 text-center md:py-32">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Track bugs. <span className="text-primary">Ship faster.</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              The issue tracker for software teams that want to build better products.
              Simple, fast, and scalable.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Get Started <MoveRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container space-y-12 py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-zinc-900 rounded-3xl">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Everything you need to manage your project issues effectively.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card>
              <CardHeader>
                <CheckCircle2 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Issue Tracking</CardTitle>
                <CardDescription>Create, assign, and track statuses of bugs effortlessly.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure</CardTitle>
                <CardDescription>Enterprise-grade security with Row Level Security (RLS).</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Bug className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Project Management</CardTitle>
                <CardDescription>Manage multiple projects and team members in one place.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left pl-4">
            Built by Labmentix. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
