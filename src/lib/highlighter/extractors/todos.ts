// Extracts todo highlights
import type { Highlight } from '../types';

export function extractTodos(text: string): Highlight[] {
  const regex = /^(\s*)(TODO:|Fix:|To be done:|REVIEW:).*/gim;
  const highlights: Highlight[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    highlights.push({
      type: 'todo',
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  return highlights;
}
