import React, { useState } from 'react';
import { Button } from '../ui/button';
import { RichTextEditor } from '../ui/rich-text-editor';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { highlightAPI } from '../../lib/api';
import {
  BookOpen,
  Lightbulb,
  AlertCircle,
  Quote,
} from 'lucide-react';

interface HighlightSpan {
  start: number;
  end: number;
  text: string;
  type: 'definition' | 'example' | 'todo' | 'quote';
}

interface TagToggle {
  tag: 'definition' | 'example' | 'todo' | 'quote';
  enabled: boolean;
  color: string;
  displayName: string;
}

// Utility function to strip HTML tags and get plain text
const stripHtml = (html: string): string => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export const SemanticHighlighter: React.FC = () => {
  const [inputHtml, setInputHtml] = useState('');
  const [highlightedSpans, setHighlightedSpans] = useState<HighlightSpan[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tagToggles, setTagToggles] = useState<TagToggle[]>([
    { tag: 'definition', enabled: true, color: 'bg-blue-100', displayName: 'Definition' },
    { tag: 'example', enabled: true, color: 'bg-green-100', displayName: 'Example' },
    { tag: 'todo', enabled: true, color: 'bg-yellow-100', displayName: 'TODO' },
    { tag: 'quote', enabled: true, color: 'bg-purple-100', displayName: 'Quote' },
  ]);

  const handleAnalyze = async () => {
    const plainText = stripHtml(inputHtml);
    if (!plainText.trim()) return;

    setIsAnalyzing(true);
    try {
      const response = await highlightAPI.analyze(plainText);
      setHighlightedSpans(response.highlights);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleTag = (tagName: 'definition' | 'example' | 'todo' | 'quote') => {
    setTagToggles(prev =>
      prev.map(toggle =>
        toggle.tag === tagName
          ? { ...toggle, enabled: !toggle.enabled }
          : toggle
      )
    );
  };

  const renderHighlightedText = () => {
    const plainText = stripHtml(inputHtml);
    
    if (!plainText || highlightedSpans.length === 0) {
      return (
        <p className="text-muted-foreground italic">No text to highlight</p>
      );
    }

    const enabledTags = new Set(
      tagToggles.filter(toggle => toggle.enabled).map(toggle => toggle.tag)
    );

    const validSpans = highlightedSpans.filter(span =>
      enabledTags.has(span.type)
    );

    if (validSpans.length === 0) {
      return <p className="text-foreground">{plainText}</p>;
    }

    const parts = [];
    let currentIndex = 0;

    validSpans.forEach(span => {
      // Add text before the span
      if (currentIndex < span.start) {
        parts.push(plainText.slice(currentIndex, span.start));
      }

      // Add the highlighted span
      const spanText = plainText.slice(span.start, span.end);
      const classMap = {
        definition: 'highlight-definition',
        example: 'highlight-example',
        todo: 'highlight-todo',
        quote: 'highlight-quote',
      };

      parts.push(
        <span key={span.start} className={classMap[span.type]}>
          {spanText}
        </span>
      );

      currentIndex = span.end;
    });

    // Add remaining text
    if (currentIndex < plainText.length) {
      parts.push(plainText.slice(currentIndex));
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
          Use the rich text editor below to create formatted content, then we'll highlight semantic structures like
          definitions, examples, TODOs, and quotes.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input-text">Input Text</Label>
          <RichTextEditor
            content={inputHtml}
            onChange={setInputHtml}
            placeholder="Start typing your text here..."
            className="min-h-[200px]"
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !stripHtml(inputHtml).trim()}
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
              {tagToggles.map(toggle => {
                const getIcon = (tag: string) => {
                  switch (tag) {
                    case 'definition':
                      return <BookOpen className="h-4 w-4" />;
                    case 'example':
                      return <Lightbulb className="h-4 w-4" />;
                    case 'todo':
                      return <AlertCircle className="h-4 w-4" />;
                    case 'quote':
                      return <Quote className="h-4 w-4" />;
                    default:
                      return null;
                  }
                };

                return (
                  <div key={toggle.tag} className="flex items-center space-x-3">
                    <Switch
                      checked={toggle.enabled}
                      onCheckedChange={() => toggleTag(toggle.tag)}
                    />
                    {getIcon(toggle.tag)}
                    <Label className="text-sm font-medium">{toggle.displayName}</Label>
                    <div className={`w-4 h-4 rounded-sm ${toggle.color}`} />
                  </div>
                );
              })}
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
