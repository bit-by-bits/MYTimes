// Extracts definition highlights
import type { Highlight } from '../types';

export function extractDefinitions(text: string): Highlight[] {
  const triggers = ['is defined as', 'refers to', 'means', 'is known as'];
  // Regex to match sentences (with punctuation)
  const sentenceRegex = /(?<=^|[.!?]\s|\n)([^.!?\n]+[.!?])(?=\s|$|\n)/g;
  const highlights: Highlight[] = [];
  let match;
  while ((match = sentenceRegex.exec(text)) !== null) {
    const sentence = match[0];
    const lower = sentence.toLowerCase();
    if (triggers.some(t => lower.includes(t))) {
      highlights.push({
        type: 'definition',
        text: sentence,
        start: match.index,
        end: match.index + sentence.length,
      });
    }
  }
  return highlights;
}
