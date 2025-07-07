// Extracts todo highlights
import type { Highlight } from '../types';

export function extractTodos(text: string): Highlight[] {
  const regex =
    /(TODO:|FIXME:|NOTE:|Fix:|HACK:|BUG:|REVIEW:|OPTIMIZE:|REFACTOR:|\- \[ \]|\- \[x\]).*/g;
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
