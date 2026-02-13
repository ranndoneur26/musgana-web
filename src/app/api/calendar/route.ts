import { NextResponse } from 'next/server';
import ICAL from 'ical.js';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour

interface CalendarEvent {
    title: string;
    date: string;
    location: string;
    description: string;
    isAllDay: boolean;
}

export async function GET() {
    try {
        const calendarUrl = 'https://calendar.google.com/calendar/ical/musgana.live%40gmail.com/public/basic.ics';
        const response = await fetch(calendarUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch calendar: ${response.statusText}`);
        }

        const data = await response.text();
        const jcalData = ICAL.parse(data);
        const vcalendar = new ICAL.Component(jcalData);
        const vevents = vcalendar.getAllSubcomponents('vevent');

        // Determine "Today" in Europe/Madrid context
        const now = new Date();
        // Create start of today (00:00:00) and end of today (23:59:59)
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);

        const events: CalendarEvent[] = [];

        vevents.forEach((vevent: any) => {
            const event = new ICAL.Event(vevent);

            // Handle Recurrence
            if (event.isRecurring()) {
                const iterator = event.iterator();
                let next;

                // Iterate through occurrences
                // We assume we don't need to look back too far, but we need to find if there is an occurrence TODAY.
                // limit iteration to avoid infinite loops, though iterator usually handles it.
                // We skip past events effectively by checking the time.

                // Convert JS dates to ICAL.Time for comparison if needed, or just iterate and convert results
                while ((next = iterator.next())) {
                    const occurrenceDate = next.toJSDate();

                    // If occurrence is after today, stop
                    if (occurrenceDate > endOfDay) {
                        break;
                    }

                    // If occurrence is within today
                    if (occurrenceDate >= startOfDay && occurrenceDate <= endOfDay) {
                        events.push({
                            title: event.summary,
                            date: occurrenceDate.toISOString(),
                            location: event.location || '',
                            description: event.description || '',
                            isAllDay: event.startDate.isDate
                        });
                    }
                }
            } else {
                // Single Event
                const eventDate = event.startDate.toJSDate();
                if (eventDate >= startOfDay && eventDate <= endOfDay) {
                    events.push({
                        title: event.summary,
                        date: eventDate.toISOString(),
                        location: event.location || '',
                        description: event.description || '',
                        isAllDay: event.startDate.isDate
                    });
                }
            }
        });

        // Sort by date/time
        events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return NextResponse.json({ events });
    } catch (error) {
        console.error('Error fetching calendar:', error);
        return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 500 });
    }
}
