'use client';

import { useState, useEffect } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    useDroppable,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
    arrayMove
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { updateTicketStatus, updateTicketOrder } from '@/actions/tickets';
import { TicketDetailsModal } from '@/components/TicketDetailsModal';
import { createClient } from '@/utils/supabase/client';

// --- Types ---
export type TicketType = {
    id: string;
    title: string;
    description: string | null;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignee?: { full_name: string | null; avatar_url: string | null } | null;
    created_at?: string;
    position: number;
    project_id: string;
};

type ColumnType = {
    id: 'todo' | 'in-progress' | 'done';
    title: string;
};

const columns: ColumnType[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
];

// --- Visual Components ---
function ColumnWrapper({ title, count, children }: { title: string, count: number, children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-full bg-secondary/20 backdrop-blur-[2px] border border-border/50 rounded-xl p-4 transition-colors hover:bg-secondary/30">
            <h3 className="font-semibold mb-4 flex items-center justify-between text-sm uppercase tracking-wide text-muted-foreground">
                {title}
                <Badge variant="secondary" className="ml-2 bg-background/50 text-foreground font-mono text-xs">
                    {count}
                </Badge>
            </h3>
            {children}
        </div>
    );
}

function DroppableColumn({ id, title, children, count }: { id: string, title: string, children: React.ReactNode, count: number }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="h-full">
            <ColumnWrapper title={title} count={count}>
                {children}
            </ColumnWrapper>
        </div>
    );
}

// --- Sortable Item Component ---
function SortableTicket({ ticket }: { ticket: TicketType }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: ticket.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : 'auto',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-3">
            {/* Render a specific drag preview style if needed, or just the card */}
            <TicketCard ticket={ticket} isOverlay={false} />
        </div>
    );
}

function TicketCard({ ticket, onClick, isOverlay }: { ticket: TicketType, onClick?: () => void, isOverlay?: boolean }) {
    const priorityColors = {
        low: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/40',
        medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800/40',
        high: 'bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800/40',
    };

    return (
        <Card
            onClick={onClick}
            className={`
                group cursor-grab active:cursor-grabbing 
                border-border/60 bg-card/80 backdrop-blur-sm 
                hover:shadow-lg hover:border-primary/20 
                transition-all duration-300 ease-in-out
                ${isOverlay ? 'shadow-xl rotate-2' : 'hover:-translate-y-1'}
            `}
        >
            <CardHeader className="p-4 pb-3 space-y-0">
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
                        {ticket.title}
                    </CardTitle>
                    <Badge variant="outline" className={`text-[10px] px-2 py-0.5 h-auto font-medium border capitalize ${priorityColors[ticket.priority]}`}>
                        {ticket.priority}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {ticket.description || <span className="italic opacity-50">No description</span>}
                </p>

                <div className="mt-3 flex items-center justify-between">
                    {/* Placeholder for assignee avatar or ID */}
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"></div>
                        {ticket.id.slice(0, 4)}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// --- Main Board Component ---
export function KanbanBoard({
    initialTickets,
    projectId
}: {
    initialTickets: TicketType[],
    projectId: string
}) {
    const [tickets, setTickets] = useState<TicketType[]>(initialTickets);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        setTickets([...initialTickets].sort((a, b) => (a.position - b.position)));
    }, [initialTickets]);

    // Realtime subscription
    useEffect(() => {
        const supabase = createClient();
        console.log('Setting up realtime subscription for project:', projectId);

        const channel = supabase
            .channel('realtime tickets')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'tickets'
                    // Removing server-side filter to debug/ensure delivery
                    // filter: `project_id=eq.${projectId}`
                },
                (payload) => {
                    console.log('Realtime payload received:', payload);

                    if (payload.eventType === 'INSERT') {
                        const newTicket = payload.new as TicketType;
                        setTickets((prev) => {
                            if (newTicket.project_id !== projectId) return prev;
                            if (prev.some(t => t.id === newTicket.id)) return prev;
                            return [newTicket, ...prev];
                        });
                    } else if (payload.eventType === 'UPDATE') {
                        const newTicket = payload.new as Partial<TicketType>;
                        setTickets((prev) => {
                            const existing = prev.find(t => t.id === newTicket.id);

                            // 1. If explicit project_id mismatch, ignore
                            if (newTicket.project_id && newTicket.project_id !== projectId) return prev;

                            // 2. If no project_id (partial update) and not in list, ignore
                            if (!newTicket.project_id && !existing) return prev;

                            // 3. Apply update
                            const updated = prev.map(t => t.id === newTicket.id ? { ...t, ...newTicket } : t);
                            return updated.sort((a, b) => (a.position - b.position));
                        });
                    } else if (payload.eventType === 'DELETE') {
                        setTickets((prev) => prev.filter(t => t.id !== payload.old.id));
                    }
                }
            )
            .subscribe((status) => {
                console.log('Realtime subscription status:', status);
            });

        return () => {
            console.log('Cleaning up realtime subscription');
            supabase.removeChannel(channel);
        };
    }, [projectId]);

    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id as string);
    }

    // Add arrayMove to imports first (I'll do that in a separate chunk via replace_file, here just the function)
    // Actually I should make sure I have arrayMove imported first.

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        const activeId = active.id as string;
        const overId = over?.id as string;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeTicket = tickets.find(t => t.id === activeId);
        const overTicket = tickets.find(t => t.id === overId);

        if (!activeTicket) return;

        let newStatus = activeTicket.status;

        // Check if dropped on a column
        if (columns.some(col => col.id === overId)) {
            newStatus = overId as 'todo' | 'in-progress' | 'done';
        } else if (overTicket) {
            // Dropped on another ticket
            newStatus = overTicket.status;
        }

        // Calculate new state based on current 'tickets'
        const oldIndex = tickets.findIndex((item) => item.id === activeId);
        const newIndex = overTicket ? tickets.findIndex((item) => item.id === overId) : oldIndex;

        let newItems = [...tickets];

        // If status changed
        if (activeTicket.status !== newStatus) {
            newItems[oldIndex] = { ...newItems[oldIndex], status: newStatus };
        }

        // Move item in array if index changed
        if (oldIndex !== newIndex) {
            newItems = arrayMove(newItems, oldIndex, newIndex);
        }

        // Recalculate positions for items in the new status column
        // This ensures the local state reflects the order we just made
        const updatedItems = newItems.map((item, index) => {
            // Only strictly needed if we want to update ALL positions locally to match array index, 
            // which is good practice for keeping position consistent.
            if (item.status === newStatus) {
                return { ...item, position: index };
            }
            return item;
        });

        // 1. Optimistic update
        setTickets(updatedItems);
        setActiveId(null);

        // 2. Server side effect
        const itemsToUpdate = updatedItems
            .filter(t => t.status === newStatus)
            .map(t => ({ id: t.id, position: t.position, status: t.status }));

        updateTicketOrder(itemsToUpdate, projectId);
    }

    if (!mounted) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {columns.map((col) => (
                    <div key={col.id} className="h-full">
                        <ColumnWrapper
                            title={col.title}
                            count={initialTickets.filter(t => t.status === col.id).length}
                        >
                            <div className="flex-1 space-y-3 min-h-[100px]">
                                {initialTickets
                                    .filter((ticket) => ticket.status === col.id)
                                    .map((ticket) => (
                                        <div key={ticket.id} className="mb-3">
                                            <TicketCard ticket={ticket} />
                                        </div>
                                    ))}
                            </div>
                        </ColumnWrapper>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                    {columns.map((col) => (
                        <DroppableColumn
                            key={col.id}
                            id={col.id}
                            title={col.title}
                            count={tickets.filter(t => t.status === col.id).length}
                        >
                            <SortableContext
                                items={tickets.filter(t => t.status === col.id).map(t => t.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="flex-1 space-y-3 min-h-[100px]">
                                    {tickets
                                        .filter((ticket) => ticket.status === col.id)
                                        .map((ticket) => (
                                            <div key={ticket.id} onClick={() => setSelectedTicket(ticket)}>
                                                <SortableTicket ticket={ticket} />
                                            </div>
                                        ))}
                                </div>
                            </SortableContext>
                        </DroppableColumn>
                    ))}
                </div>
                <DragOverlay dropAnimation={{
                    duration: 250,
                    easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
                }}>
                    {activeId ? (
                        <TicketCard ticket={tickets.find(t => t.id === activeId)!} isOverlay />
                    ) : null}
                </DragOverlay>
            </DndContext>

            <TicketDetailsModal
                ticket={selectedTicket}
                open={!!selectedTicket}
                onOpenChange={(open) => !open && setSelectedTicket(null)}
            />
        </>
    );
}
