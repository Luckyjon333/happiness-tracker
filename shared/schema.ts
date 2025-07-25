import { z } from "zod";

export const happinessEntrySchema = z.object({
  id: z.string(),
  date: z.string(), // ISO date string (YYYY-MM-DD)
  score: z.number().min(1).max(10),
  reflection: z.string().optional(),
  intention: z.string().optional(),
  createdAt: z.string(), // ISO datetime string
  updatedAt: z.string(), // ISO datetime string
});

export const insertHappinessEntrySchema = happinessEntrySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type HappinessEntry = z.infer<typeof happinessEntrySchema>;
export type InsertHappinessEntry = z.infer<typeof insertHappinessEntrySchema>;

// Happiness scale descriptions
export const HAPPINESS_DESCRIPTIONS = {
  1: "Extremely unhappy: feeling hopeless, deeply dissatisfied, or emotionally distressed.",
  2: "Very unhappy: frequent sadness, anxiety, or numbness.",
  3: "Unhappy: life feels heavy, flat, or frustrating most of the time.",
  4: "Somewhat unhappy: mood is dull or restless, moments of discontent.",
  5: "Neutral: not particularly happy or unhappy, emotionally flat.",
  6: "Slightly happy: occasional positive emotions, but not consistent.",
  7: "Moderately happy: good mood most days, mild contentment.",
  8: "Happy: frequent joy, satisfaction, and emotional balance.",
  9: "Very happy: strong sense of purpose, presence, and fulfillment.",
  10: "Extremely happy: deep joy and peace, fully alive and present."
} as const;
