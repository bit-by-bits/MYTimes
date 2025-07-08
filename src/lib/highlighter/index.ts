import { preprocessText } from './preprocess';
import { extractDefinitions } from './extractors/definitions';
import { extractExamples } from './extractors/examples';
import { extractTodos } from './extractors/todos';
import { extractBullets } from './extractors/bullets';
import { extractCodeblocks } from './extractors/codeblocks';
import { validateHighlights } from './validate';
import { postprocessHighlights } from './postprocess';
import type { Highlight } from './types';

export function analyzeText(
  text: string
): { start: number; end: number; tag: string }[] {
  const preprocessed = preprocessText(text);
  let highlights: { start: number; end: number; type: string }[] = [];
  highlights = highlights.concat(
    extractDefinitions(preprocessed),
    extractExamples(preprocessed),
    extractTodos(preprocessed),
    extractBullets(preprocessed),
    extractCodeblocks(preprocessed)
  );
  // Add 'text' property for compatibility with validate/postprocess, and cast type
  const allowedTypes = [
    'definition',
    'example',
    'todo',
    'bullet',
    'numbered',
    'code',
  ] as const;
  function isHighlightType(t: string): t is Highlight['type'] {
    return (allowedTypes as readonly string[]).includes(t);
  }
  const highlightsWithText: Highlight[] = highlights
    .filter(h => isHighlightType(h.type))
    .map(h => ({
      ...h,
      text: preprocessed.slice(h.start, h.end),
      type: h.type as Highlight['type'],
    }));
  let valid = validateHighlights(preprocessed, highlightsWithText);
  valid = postprocessHighlights(valid);
  // Convert to {start, end, tag} format for output
  return valid
    .map(({ start, end, type }) => ({ start, end, tag: type }))
    .sort((a, b) => a.start - b.start);
}
