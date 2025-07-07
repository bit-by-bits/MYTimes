// Extracts example highlights
import type { Highlight } from '../types';

export function extractExamples(text: string): Highlight[] {
  const regex =
    /(For example|for example|e\.g\.|E\.g\.|for instance|such as|like|including|namely|specifically|consider|take|imagine)[^\n.]*[.]/g;
  const highlights: Highlight[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    highlights.push({
      type: 'example',
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  return highlights;
}
