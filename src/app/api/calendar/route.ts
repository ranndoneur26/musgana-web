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
        // Create start of today (00:00:00)
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);

        const events: CalendarEvent[] = [];

        vevents.forEach((vevent: any) => {
            const event = new ICAL.Event(vevent);

            // Handle Recurrence
            if (event.isRecurring()) {
                const iterator = event.iterator();
                let next;
                let occurrencesChecked = 0;
                const maxOccurrences = 1000; // limit iteration

                // Convert JS dates to ICAL.Time for comparison if needed, or just iterate and convert results
                while ((next = iterator.next()) && occurrencesChecked < maxOccurrences) {
                    occurrencesChecked++;
                    const occurrenceDate = next.toJSDate();

                    // We only care about the *first* occurrence that is on or after today
                    if (occurrenceDate >= startOfDay) {
                        events.push({
                            title: event.summary,
                            date: occurrenceDate.toISOString(),
                            location: event.location || '',
                            description: event.description || '',
                            isAllDay: event.startDate.isDate
                        });
                        break;
                    }
                }
            } else {
                // Single Event
                const eventDate = event.startDate.toJSDate();
                if (eventDate >= startOfDay) {
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

        // Filter to only include events from the very first upcoming date
        let nextEvents: CalendarEvent[] = [];
        if (events.length > 0) {
            const firstEventDate = new Date(events[0].date);
            const firstEventStartOfDay = new Date(firstEventDate);
            firstEventStartOfDay.setHours(0, 0, 0, 0);

            const firstEventEndOfDay = new Date(firstEventDate);
            firstEventEndOfDay.setHours(23, 59, 59, 999);

            nextEvents = events.filter(e => {
                const d = new Date(e.date);
                return d >= firstEventStartOfDay && d <= firstEventEndOfDay;
            });
        }

        return NextResponse.json({ events: nextEvents });
    } catch (error) {
        console.error('Error fetching calendar:', error);
        return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 500 });
    }
}
