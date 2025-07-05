import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

interface HighlightSpan {
  start: number;
  end: number;
  tag: 'Definition' | 'Example' | 'TODO' | 'Quote';
}

interface TagToggle {
  tag: 'Definition' | 'Example' | 'TODO' | 'Quote';
  enabled: boolean;
  color: string;
}

export const SemanticHighlighter: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [highlightedSpans, setHighlightedSpans] = useState<HighlightSpan[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tagToggles, setTagToggles] = useState<TagToggle[]>([
    { tag: 'Definition', enabled: true, color: 'bg-blue-100' },
    { tag: 'Example', enabled: true, color: 'bg-green-100' },
    { tag: 'TODO', enabled: true, color: 'bg-yellow-100' },
    { tag: 'Quote', enabled: true, color: 'bg-purple-100' },
  ]);

  const mockAnalyze = (text: string): HighlightSpan[] => {
    const spans: HighlightSpan[] = [];
    
    // Mock analysis - in real app, this would call the backend API
    const patterns = [
      { pattern: /is defined as/gi, tag: 'Definition' as const },
      { pattern: /refers to/gi, tag: 'Definition' as const },
      { pattern: /for example/gi, tag: 'Example' as const },
      { pattern: /such as/gi, tag: 'Example' as const },
      { pattern: /e\.g\./gi, tag: 'Example' as const },
      { pattern: /TODO:/gi, tag: 'TODO' as const },
      { pattern: /Fix:/gi, tag: 'TODO' as const },
      { pattern: /according to/gi, tag: 'Quote' as const },
      { pattern: /as stated by/gi, tag: 'Quote' as const },
    ];

    patterns.forEach(({ pattern, tag }) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        spans.push({
          start: match.index,
          end: match.index + match[0].length,
          tag,
        });
      }
    });

    return spans.sort((a, b) => a.start - b.start);
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const spans = mockAnalyze(inputText);
      setHighlightedSpans(spans);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleTag = (tagName: 'Definition' | 'Example' | 'TODO' | 'Quote') => {
    setTagToggles(prev => 
      prev.map(toggle => 
        toggle.tag === tagName 
          ? { ...toggle, enabled: !toggle.enabled }
          : toggle
      )
    );
  };

  const renderHighlightedText = () => {
    if (!inputText || highlightedSpans.length === 0) {
      return <p className="text-muted-foreground italic">No text to highlight</p>;
    }

    const enabledTags = new Set(
      tagToggles.filter(toggle => toggle.enabled).map(toggle => toggle.tag)
    );

    const validSpans = highlightedSpans.filter(span => enabledTags.has(span.tag));

    if (validSpans.length === 0) {
      return <p className="text-foreground">{inputText}</p>;
    }

    const parts = [];
    let currentIndex = 0;

    validSpans.forEach(span => {
      // Add text before the span
      if (currentIndex < span.start) {
        parts.push(inputText.slice(currentIndex, span.start));
      }

      // Add the highlighted span
      const spanText = inputText.slice(span.start, span.end);
      const classMap = {
        Definition: 'highlight-definition',
        Example: 'highlight-example',
        TODO: 'highlight-todo',
        Quote: 'highlight-quote',
      };

      parts.push(
        <span key={span.start} className={classMap[span.tag]}>
          {spanText}
        </span>
      );

      currentIndex = span.end;
    });

    // Add remaining text
    if (currentIndex < inputText.length) {
      parts.push(inputText.slice(currentIndex));
    }

    return <div className="text-foreground">{parts}</div>;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Semantic Text Highlighter
        </h2>
        <p className="text-muted-foreground">
          Paste your text below and we'll highlight semantic structures like definitions, examples, TODOs, and quotes.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input-text">Input Text</Label>
          <Textarea
            id="input-text"
            placeholder="Paste your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px] resize-none"
          />
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !inputText.trim()}
            className="px-8"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </Button>
        </div>
      </div>

      {highlightedSpans.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium tracking-tight mb-3">
              Tag Toggles
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {tagToggles.map((toggle) => (
                <div key={toggle.tag} className="flex items-center space-x-3">
                  <Switch
                    checked={toggle.enabled}
                    onCheckedChange={() => toggleTag(toggle.tag)}
                  />
                  <Label className="text-sm font-medium">
                    {toggle.tag}
                  </Label>
                  <div className={`w-4 h-4 rounded-sm ${toggle.color}`} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium tracking-tight mb-3">
              Highlighted Text
            </h3>
            <div className="p-4 bg-muted/50 rounded-lg border">
              {renderHighlightedText()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};