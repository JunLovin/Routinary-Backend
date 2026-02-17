import type { ParsedRoutine } from '@/types/event.type';
import { tryParseJSON } from './utils';

export const generateICS = (dataStr: string): string => {
  try {
    const data = tryParseJSON(dataStr) as ParsedRoutine;
    if (!data) {
      throw new Error('Invalid data format for ICS generation');
    }
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]?.replace(/-/g, ''); // "20260129"

    const header = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Routinary//EN',
      `X-WR-CALNAME:${data.suggestedTitle || 'Routinary Events'}`,
    ];

    const body = data.events.map((e) => {
      // Here transform from "07:00" to "20260129T070000"
      const start = `${dateStr}T${e.startTime.replace(':', '')}00`;
      const end = `${dateStr}T${e.endTime.replace(':', '')}00`;

      const eventLines = [
        'BEGIN:VEVENT',
        `SUMMARY:${e.title}`,
        `DESCRIPTION:${e.description}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
      ];

      if (e.isRecurring) {
        eventLines.push('RRULE:FREQ=DAILY'); // The event will be everyday
      }

      eventLines.push('END:VEVENT');

      return eventLines.join('\n');
    });

    const footer = ['END:VCALENDAR'];

    return [...header, ...body, ...footer].join('\n');
  } catch (error) {
    console.error('Error generating ICS:', error);
    throw new Error('Failed to generate ICS file');
  }
};
