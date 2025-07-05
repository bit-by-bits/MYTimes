import React, { useState } from 'react';
import { Button } from '../ui/button';
import { RichTextEditor } from '../ui/rich-text-editor';
import { PillToggle } from '../ui/pill-toggle';
import { Label } from '../ui/label';
import { highlightAPI } from '../../lib/api';
import {
  BookOpen,
  Lightbulb,
  AlertCircle,
  Quote,
  Loader2,
  Copy,
  Sparkles,
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
  tooltip: string;
}

// Sample text for demonstration
const SAMPLE_TEXT = `Machine Learning is defined as a subset of artificial intelligence that enables computers to learn and make decisions from data without explicit programming. 

For example, recommendation systems like those used by Netflix use machine learning algorithms to suggest movies based on viewing history. Consider how spam detection works - it analyzes email patterns to identify unwanted messages.

TODO: Implement feature selection algorithm for better model performance. REVIEW: Check data preprocessing pipeline for efficiency.

According to Andrew Ng, "Machine learning is the new electricity." As stated in recent research, "Deep learning has revolutionized computer vision and natural language processing."

The algorithm is characterized by its ability to improve performance through experience, making it particularly useful for tasks like image recognition, natural language processing, and predictive analytics.`;

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
  const [copyMessage, setCopyMessage] = useState('');
  const [tagToggles, setTagToggles] = useState<TagToggle[]>([
    {
      tag: 'definition',
      enabled: true,
      color: 'bg-blue-200',
      displayName: 'Definition',
      tooltip: 'Highlights definitions and explanations in your text',
    },
    {
      tag: 'example',
      enabled: true,
      color: 'bg-green-200',
      displayName: 'Example',
      tooltip: 'Identifies examples and illustrations that support concepts',
    },
    {
      tag: 'todo',
      enabled: true,
      color: 'bg-yellow-200',
      displayName: 'TODO',
      tooltip: 'Finds action items, TODOs, and tasks in your text',
    },
    {
      tag: 'quote',
      enabled: true,
      color: 'bg-purple-200',
      displayName: 'Quote',
      tooltip: 'Highlights quotes, references, and citations',
    },
  ]);

  const handleAnalyze = async () => {
    const plainText = stripHtml(inputHtml);
    if (!plainText.trim()) return;

    setIsAnalyzing(true);
    try {
      const enabledTags = tagToggles
        .filter(toggle => toggle.enabled)
        .map(toggle => toggle.tag);

      const response = await highlightAPI.analyze(plainText, 'en', enabledTags);
      setHighlightedSpans(response.highlights);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = () => {
    setInputHtml(`<p>${SAMPLE_TEXT.replace(/\n\n/g, '</p><p>')}</p>`);
    setHighlightedSpans([]);
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

  const copyHighlightedText = async () => {
    const plainText = stripHtml(inputHtml);
    try {
      await navigator.clipboard.writeText(plainText);
      setCopyMessage('Text copied to clipboard!');
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (error) {
      setCopyMessage('Failed to copy text');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  const renderHighlightedText = () => {
    const plainText = stripHtml(inputHtml);

    if (!plainText || highlightedSpans.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="text-muted-foreground italic mb-4">
            {!plainText
              ? 'Enter some text above to see highlights'
              : 'No highlights found in your text'}
          </div>
          {!plainText && (
            <Button onClick={handleLoadSample} variant="outline" size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Try Sample Text
            </Button>
          )}
        </div>
      );
    }

    const enabledTags = new Set(
      tagToggles.filter(toggle => toggle.enabled).map(toggle => toggle.tag)
    );

    const validSpans = highlightedSpans.filter(span =>
      enabledTags.has(span.type)
    );

    if (validSpans.length === 0) {
      return <p className="text-foreground leading-relaxed">{plainText}</p>;
    }

    const parts = [];
    let currentIndex = 0;

    validSpans.forEach((span, index) => {
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

      const typeLabels = {
        definition: 'Definition',
        example: 'Example',
        todo: 'TODO',
        quote: 'Quote',
      };

      parts.push(
        <span
          key={`${span.start}-${index}`}
          className={`${classMap[span.type]} relative group inline-block`}
          title={`${typeLabels[span.type]}: ${spanText.slice(0, 100)}${spanText.length > 100 ? '...' : ''}`}
        >
          {spanText}
          <span className="absolute -top-6 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
            {typeLabels[span.type]}
          </span>
        </span>
      );

      currentIndex = span.end;
    });

    // Add remaining text
    if (currentIndex < plainText.length) {
      parts.push(plainText.slice(currentIndex));
    }

    return <div className="text-foreground leading-relaxed">{parts}</div>;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-3">
          Semantic Text Highlighter
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Use our AI-powered editor to create formatted content, then we'll
          intelligently highlight semantic structures like definitions,
          examples, action items, and quotes.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="input-text" className="text-base font-semibold">
              Input Text
            </Label>
            <Button
              onClick={handleLoadSample}
              variant="outline"
              size="sm"
              className="text-sm"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Try Sample Text
            </Button>
          </div>
          <RichTextEditor
            content={inputHtml}
            onChange={setInputHtml}
            placeholder="Start typing your text here, or use the sample text to see how highlighting works..."
            className="min-h-[250px] shadow-sm"
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !stripHtml(inputHtml).trim()}
            className="px-8 py-3 text-lg font-semibold min-w-[140px]"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Text'
            )}
          </Button>
        </div>
      </div>

      {highlightedSpans.length > 0 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold tracking-tight mb-4">
              Highlight Controls
            </h3>
            <div className="flex flex-wrap gap-3">
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
                  <PillToggle
                    key={toggle.tag}
                    enabled={toggle.enabled}
                    onToggle={() => toggleTag(toggle.tag)}
                    icon={getIcon(toggle.tag)}
                    label={toggle.displayName}
                    tooltip={toggle.tooltip}
                    color={toggle.color}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold tracking-tight">
                Highlighted Results
              </h3>
              <div className="flex items-center space-x-2">
                {copyMessage && (
                  <span className="text-sm text-green-600 font-medium">
                    {copyMessage}
                  </span>
                )}
                <Button
                  onClick={copyHighlightedText}
                  variant="outline"
                  size="sm"
                  className="text-sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text
                </Button>
              </div>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 shadow-inner">
              {renderHighlightedText()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
