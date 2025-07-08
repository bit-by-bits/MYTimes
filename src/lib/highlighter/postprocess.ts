import type { Highlight } from './types';

export function postprocessHighlights(highlights: Highlight[]): Highlight[] {
  // Sort by start, then by longest span (end-start desc)
  const sorted = highlights
    .slice()
    .sort((a, b) =>
      a.start !== b.start
        ? a.start - b.start
        : b.end - b.start - (a.end - a.start)
    );
  // Remove overlaps and duplicates
  const result: Highlight[] = [];
  let lastEnd = -1;
  for (const h of sorted) {
    // Remove duplicates
    if (
      result.some(
        r => r.start === h.start && r.end === h.end && r.type === h.type
      )
    )
      continue;
    // Remove overlaps (keep longest span)
    if (h.start >= lastEnd) {
      result.push(h);
      lastEnd = h.end;
    }
  }
  return result;
}
