// Extracts example highlights
import type { Highlight } from '../types';

export function extractExamples(text: string): Highlight[] {
  const triggers = ['for example', 'such as', 'e.g.', 'for instance'];
  // Regex to match sentences (with punctuation)
  const sentenceRegex = /(?<=^|[.!?]\s|\n)([^.!?\n]+[.!?])(?=\s|$|\n)/g;
  const highlights: Highlight[] = [];
  let match;
  while ((match = sentenceRegex.exec(text)) !== null) {
    const sentence = match[0];
    const lower = sentence.toLowerCase();
    if (triggers.some(t => lower.includes(t))) {
      highlights.push({
        type: 'example',
        text: sentence,
        start: match.index,
        end: match.index + sentence.length,
      });
    }
  }
  return highlights;
}
