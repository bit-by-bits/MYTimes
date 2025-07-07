// Extracts definition highlights
import type { Highlight } from '../types';

export function extractDefinitions(text: string): Highlight[] {
  const regex =
    /(?:A |An |The )?([A-Z][a-zA-Z0-9_\- ]+) (is|refers to|means|can be described as|is defined as|are) ([^.\n]+[.])/g;
  const highlights: Highlight[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    highlights.push({
      type: 'definition',
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  return highlights;
}
