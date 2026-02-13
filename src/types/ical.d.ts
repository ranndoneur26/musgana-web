declare module 'ical.js' {
    export function parse(input: string): any;

    export class Component {
        constructor(jcal: any);
        getAllSubcomponents(name: string): any[];
    }

    export class Event {
        constructor(component: any | null);
        summary: string;
        location: string;
        description: string;
        startDate: Time;
        endDate: Time;
        isRecurring(): boolean;
        iterator(startTime?: Time): RecurExpansion;
    }

    export class RecurExpansion {
        next(): Time;
        complete: boolean;
    }

    export class Time {
        static fromJSDate(d: Date): Time;
        toJSDate(): Date;
        isDate: boolean;
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    }
}
