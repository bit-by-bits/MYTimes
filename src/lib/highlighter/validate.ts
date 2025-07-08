import type { Highlight } from './types';

export function validateHighlights(
  text: string,
  highlights: Highlight[]
): Highlight[] {
  return highlights.filter(
    h =>
      h &&
      typeof h.start === 'number' &&
      typeof h.end === 'number' &&
      h.start >= 0 &&
      h.end <= text.length &&
      h.start < h.end &&
      typeof h.type === 'string'
  );
}
