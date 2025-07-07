import type { Highlight } from './types';

export function postprocessHighlights(highlights: Highlight[]): Highlight[] {
  // Sort by start index
  const sorted = highlights.slice().sort((a, b) => a.start - b.start);
  // Remove overlaps
  const result: Highlight[] = [];
  let lastEnd = -1;
  for (const h of sorted) {
    if (h.start >= lastEnd) {
      result.push(h);
      lastEnd = h.end;
    }
  }
  return result;
}
