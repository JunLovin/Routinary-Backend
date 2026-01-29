export interface ParsedEvent {
  title: string;
  description?: string;
  isRecurring?: boolean;
  startTime: string; // Format "HH:mm" (e.g. "06:00")
  endTime: string; // Format "HH:mm" (e.g. "07:00")
  category?: "work" | "health" | "leisure" | "personal" | "sleep" | "food";
}

export interface ParsedRoutine {
  events: ParsedEvent[];
  summary: string | null;
  suggestedTitle?: string;
  error?: string;
}
