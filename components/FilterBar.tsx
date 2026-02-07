'use client';

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type FilterBarProps = {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    priorityFilter: string;
    onPriorityChange: (priority: string) => void;
    statusFilter: string;
    onStatusChange: (status: string) => void;
};

export function FilterBar({
    searchQuery,
    onSearchChange,
    priorityFilter,
    onPriorityChange,
    statusFilter,
    onStatusChange,
}: FilterBarProps) {
    const hasActiveFilters = searchQuery || priorityFilter !== 'all' || statusFilter !== 'all';

    function clearFilters() {
        onSearchChange('');
        onPriorityChange('all');
        onStatusChange('all');
    }

    return (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-muted/30 rounded-lg border">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9 bg-background"
                />
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={priorityFilter} onValueChange={onPriorityChange}>
                    <SelectTrigger className="w-[130px] bg-background">
                        <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={onStatusChange}>
                <SelectTrigger className="w-[140px] bg-background">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                </SelectContent>
            </Select>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-1 text-muted-foreground hover:text-foreground"
                >
                    <X className="h-4 w-4" />
                    Clear
                </Button>
            )}
        </div>
    );
}
