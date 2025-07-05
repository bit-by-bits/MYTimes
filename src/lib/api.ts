interface HighlightSpan {
  start: number;
  end: number;
  text: string;
  type: 'definition' | 'example' | 'todo' | 'quote';
}

interface HighlightAPIResponse {
  highlights: HighlightSpan[];
}

interface HighlightAPIRequest {
  text: string;
}

// Simulate API endpoint
const API_BASE_URL = '/api';

export const highlightAPI = {
  async analyze(text: string): Promise<HighlightAPIResponse> {
    try {
      // Simulate API call with proper structure
      const response = await fetch(`${API_BASE_URL}/highlight`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text } as HighlightAPIRequest),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return await response.json() as HighlightAPIResponse;
    } catch (error) {
      // Fallback to dummy implementation when API is not available
      console.warn('API not available, using dummy implementation:', error);
      return await this.dummyAnalyze(text);
    }
  },

  async dummyAnalyze(text: string): Promise<HighlightAPIResponse> {
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create highlights based on patterns
    const patterns = [
      { pattern: /is defined as|refers to|means that|is a|are a/gi, type: 'definition' as const },
      { pattern: /for example|such as|e\.g\.|for instance|like|including/gi, type: 'example' as const },
      { pattern: /TODO:|FIXME:|NOTE:|Fix:|HACK:|BUG:/gi, type: 'todo' as const },
      { pattern: /"[^"]*"|'[^']*'|according to|as stated|mentioned/gi, type: 'quote' as const },
    ];

    const foundHighlights: HighlightSpan[] = [];
    
    patterns.forEach(({ pattern, type }) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        foundHighlights.push({
          start: match.index,
          end: match.index + match[0].length,
          text: match[0],
          type,
        });
      }
    });

    return { 
      highlights: foundHighlights
        .sort((a, b) => a.start - b.start)
        .filter((highlight, index, array) => {
          // Remove overlapping highlights
          if (index === 0) return true;
          const prev = array[index - 1];
          return highlight.start >= prev.end;
        })
    };
  }
};