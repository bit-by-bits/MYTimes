import type { Highlight } from './types';

export function validateHighlights(
  text: string,
  highlights: Highlight[]
): Highlight[] {
  return highlights
    .map(h => {
      // If the indices are off, try to realign
      if (text.slice(h.start, h.end) !== h.text) {
        const idx = text.indexOf(h.text, h.start - 10 >= 0 ? h.start - 10 : 0);
        if (idx !== -1) {
          return { ...h, start: idx, end: idx + h.text.length };
        }
        // If not found, discard
        return null;
      }
      return h;
    })
    .filter((h): h is Highlight => !!h && h.start >= 0 && h.end <= text.length);
}
