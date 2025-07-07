interface HighlightSpan {
  start: number;
  end: number;
  text: string;
  type: 'definition' | 'example' | 'todo' | 'bullet' | 'numbered' | 'codeblock';
}

interface HighlightAPIResponse {
  highlights: HighlightSpan[];
}

interface HighlightAPIRequest {
  text: string;
}

// API endpoint
const API_BASE_URL = '/api';

export const highlightAPI = {
  async analyze(text: string): Promise<HighlightAPIResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/highlight`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
        } as HighlightAPIRequest),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return (await response.json()) as HighlightAPIResponse;
    } catch (error) {
      // Fallback to dummy implementation when API is not available
      console.warn('API not available, using dummy implementation:', error);
      return await this.dummyAnalyze(text);
    }
  },

  async dummyAnalyze(text: string): Promise<HighlightAPIResponse> {
    // Simulate API latency
    await new Promise(resolve =>
      setTimeout(resolve, 1200 + Math.random() * 800)
    );

    // Enhanced pattern matching for all types
    const patterns = [
      {
        pattern:
          /is defined as|refers to|means that|is a|are a|can be described as|is characterized by/gi,
        type: 'definition' as const,
      },
      {
        pattern:
          /for example|such as|e\.g\.|for instance|like|including|namely|specifically|consider|take|imagine/gi,
        type: 'example' as const,
      },
      {
        pattern:
          /TODO:|FIXME:|NOTE:|Fix:|HACK:|BUG:|REVIEW:|OPTIMIZE:|REFACTOR:/gi,
        type: 'todo' as const,
      },
      {
        pattern: /^[\s]*[-•*]\s+/gm,
        type: 'bullet' as const,
      },
      {
        pattern: /^[\s]*\d+\.\s+/gm,
        type: 'numbered' as const,
      },
      {
        pattern: /```[\s\S]*?```|`[^`]+`/g,
        type: 'codeblock' as const,
      },
    ];

    const foundHighlights: HighlightSpan[] = [];

    patterns.forEach(({ pattern, type }) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        // Extend the match to include surrounding context for better highlighting
        let start = match.index;
        let end = match.index + match[0].length;

        // For definitions, try to capture the full definition
        if (type === 'definition') {
          const afterMatch = text.slice(end, end + 100);
          const definitionEnd = afterMatch.search(/[.!?;]/);
          if (definitionEnd !== -1) {
            end = Math.min(end + definitionEnd, text.length);
          }
        }

        // For examples, try to capture the full example
        if (type === 'example') {
          const beforeMatch = text.slice(Math.max(0, start - 50), start);
          const exampleStart = beforeMatch.lastIndexOf('.') + 1;
          if (exampleStart > 0) {
            start = Math.max(0, start - 50 + exampleStart);
          }

          const afterMatch = text.slice(end, end + 100);
          const exampleEnd = afterMatch.search(/[.!?]/);
          if (exampleEnd !== -1) {
            end = Math.min(end + exampleEnd + 1, text.length);
          }
        }

        // For bullets and numbered lists, capture the full line
        if (type === 'bullet' || type === 'numbered') {
          const afterMatch = text.slice(end);
          const lineEnd = afterMatch.search(/\n/);
          if (lineEnd !== -1) {
            end = Math.min(end + lineEnd, text.length);
          }
        }

        foundHighlights.push({
          start,
          end,
          text: text.slice(start, end),
          type,
        });
      }
    });

    // Add some dummy highlights for demonstration if no patterns are found
    if (foundHighlights.length === 0 && text.length > 20) {
      const dummyHighlights = [
        {
          type: 'definition' as const,
          start: 0,
          end: Math.min(50, text.length),
          text: text.slice(0, Math.min(50, text.length)),
        },
      ];

      foundHighlights.push(...dummyHighlights);
    }

    return {
      highlights: foundHighlights
        .sort((a, b) => a.start - b.start)
        .filter((highlight, index, array) => {
          // Remove overlapping highlights
          if (index === 0) return true;
          const prev = array[index - 1];
          return highlight.start >= prev.end;
        })
        .slice(0, 20), // Limit to 20 highlights for performance
    };
  },
};
