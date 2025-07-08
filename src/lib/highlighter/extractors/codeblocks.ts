// Extracts codeblock highlights
import type { Highlight } from '../types';

export function extractCodeblocks(text: string): Highlight[] {
  const regex = /```[\s\S]*?```/g;
  const highlights: Highlight[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    highlights.push({
      type: 'code',
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  return highlights;
}
