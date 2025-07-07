// Extracts codeblock highlights
import type { Highlight } from '../types';

export function extractCodeblocks(text: string): Highlight[] {
  const regex =
    /```[\s\S]*?```|^[ \t]*(class|def|function|public |private |protected |if |for |while |return |import |export ).*/gm;
  const highlights: Highlight[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    highlights.push({
      type: 'codeblock',
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  return highlights;
}
