import type { ParsedRoutine } from '@/types/event.type';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('Gemini API key is missing');
};

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are the data structuring engine for Routinary. Your role is to transform natural language descriptions into precise JSON schemas for calendars.

OBJECTIVE Analyze user input, identify activities, and assign them logical and chronological time blocks.

STRICT BUSINESS RULES

Set isRecurring to true by default. Set it to false only if the user specifies a specific date (e.g., "tomorrow", "this Friday", "Jan 10th").

FORMAT: Return EXCLUSIVELY a valid JSON object. Do NOT include text before or after, and do NOT use Markdown code blocks like triple backticks in the final production output.

TIME FORMATTING:

Use 24-hour format (HH:mm).

Contextual Logic: If the user says 9, assume the most logical time (e.g., breakfast at 9 = 09:00, dinner at 9 = 21:00).

Default Durations: If no end time is specified, use: Meals (45 min), Exercise (1h), Short tasks (30 min), Sleep (8h).

COHERENCE: Ensure events do not overlap unless physically possible.

LANGUAGE: The JSON content must be in THE SAME LANGUAGE OR ENGLISH as the user's message.

JSON STRUCTURE { "suggestedTitle": "Creative and motivating title", "summary": "A 1-sentence summary of the day's focus", "events": [ { "title": "Event name", "description": "Extracted or inferred detail", "startTime": "HH:mm", "endTime": "HH:mm", "isRecurring": boolean, "category": "work|health|leisure|personal|sleep|food" } ] }

HANDLING INVALID INPUT If the message contains no actionable information, return: { "error": "No activities detected. Please describe what you want to do and when.", "suggestedTitle": null, "summary": null, "events": [] }

FLOW EXAMPLE User: Tomorrow I want to wake up at 6 to run, work from 9 to 5, and then read a bit before sleeping at 10. Output: {"suggestedTitle": "Productivity & Wellness Day", "summary": "A balanced day featuring exercise, work, and mental rest.", "events": [...]}
`.trim();

export const parsePromptToEvents = async (prompt: string): Promise<ParsedRoutine> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      },
      contents: prompt
    });

    const text = response.text;

    const parsed = JSON.parse(text || '');

    return parsed as ParsedRoutine;
  } catch (error) {
    console.error('Error generating json with AI:', error);
    throw error;
  }
};
