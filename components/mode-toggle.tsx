"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function ThemeSelector() {
    const { setTheme, theme } = useTheme()

    // Avoid hydration mismatch
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => setMounted(true), [])

    if (!mounted) {
        return (
            <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>Light</Button>
                <Button variant="outline" disabled>Dark</Button>
                <Button variant="secondary" disabled>System</Button>
            </div>
        )
    }

    return (
        <div className="flex items-center space-x-2">
            <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => setTheme("light")}
            >
                Light
            </Button>
            <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setTheme("dark")}
            >
                Dark
            </Button>
            <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                onClick={() => setTheme("system")}
            >
                System
            </Button>
        </div>
    )
}
