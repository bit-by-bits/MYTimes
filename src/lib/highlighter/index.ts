import { preprocessText } from './preprocess';
import { extractDefinitions } from './extractors/definitions';
import { extractExamples } from './extractors/examples';
import { extractTodos } from './extractors/todos';
import { extractBullets } from './extractors/bullets';
import { extractCodeblocks } from './extractors/codeblocks';
import { validateHighlights } from './validate';
import { postprocessHighlights } from './postprocess';
import type { Highlight } from './types';

export function extractHighlights(text: string): Highlight[] {
  const preprocessed = preprocessText(text);
  let highlights: Highlight[] = [];
  highlights = highlights.concat(
    extractDefinitions(preprocessed),
    extractExamples(preprocessed),
    extractTodos(preprocessed),
    extractBullets(preprocessed),
    extractCodeblocks(preprocessed)
  );
  highlights = validateHighlights(preprocessed, highlights);
  highlights = postprocessHighlights(highlights);
  return highlights;
}
