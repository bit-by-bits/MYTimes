// Extracts bullet and numbered list highlights
import type { Highlight } from '../types';

export function extractBullets(text: string): Highlight[] {
  const regex = /^[\s]*([\-•*]|\d+\.)\s+[^\n]+/gm;
  const highlights: Highlight[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    highlights.push({
      type: /^[\d]+\./.test(match[1]) ? 'bullet' : 'bullet',
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  return highlights;
}
