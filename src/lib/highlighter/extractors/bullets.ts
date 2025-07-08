// Extracts bullet and numbered list highlights
import type { Highlight } from '../types';

export function extractBullets(text: string): Highlight[] {
  const highlights: Highlight[] = [];
  // Bullets: •, - , *
  const bulletRegex = /^\s*(•|- |\* ).+$/gm;
  let match;
  while ((match = bulletRegex.exec(text)) !== null) {
    highlights.push({
      type: 'bullet',
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  // Numbered: 1., 2., ... (only at line start)
  const numberedRegex = /^\s*\d+\.\s+.+$/gm;
  while ((match = numberedRegex.exec(text)) !== null) {
    highlights.push({
      type: 'numbered',
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  return highlights;
}
