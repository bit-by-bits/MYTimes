import React, { useState, useCallback } from 'react';
import type { JSX } from 'react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { FileUpload } from '../components/ui/file-upload';
import { toast } from 'react-hot-toast';
import { HighlightLegend } from '../components/ui/highlight-legend';
import { useAuth } from '../contexts/AuthContext';
import { Trash2, Sparkles, Sun, Moon } from 'lucide-react';
import { analyzeText } from '../lib/highlighter';
import { useTheme } from '../contexts/ThemeContext';

type TagType =
  | 'definition'
  | 'example'
  | 'todo'
  | 'bullet'
  | 'numbered'
  | 'code';
interface HighlightSpan {
  start: number;
  end: number;
  tag: TagType;
}

interface HighlightType {
  type: 'definition' | 'example' | 'todo' | 'bullet' | 'numbered' | 'code';
  label: string;
  color: string;
  enabled: boolean;
}

const SAMPLE_TEXT = `Machine Learning is defined as a subset of artificial intelligence that enables computers to learn and make decisions from data without explicit programming. 

For example, recommendation systems like those used by Netflix use machine learning algorithms to suggest movies based on viewing history. Consider how spam detection works - it analyzes email patterns to identify unwanted messages.

TODO: Implement feature selection algorithm for better model performance. REVIEW: Check data preprocessing pipeline for efficiency.

Key components of machine learning include:

• Data preprocessing and feature engineering
• Model selection and training
• Evaluation and validation
• Deployment and monitoring

1. Supervised Learning: Uses labeled training data
2. Unsupervised Learning: Finds patterns in unlabeled data
3. Reinforcement Learning: Learns through trial and error

\`\`\`python
def train_model(X, y):
    model = RandomForestClassifier()
    model.fit(X, y)
    return model
\`\`\`

According to Andrew Ng, "Machine learning is the new electricity." As stated in recent research, "Deep learning has revolutionized computer vision and natural language processing."

The algorithm is characterized by its ability to improve performance through experience, making it particularly useful for tasks like image recognition, natural language processing, and predictive analytics.`;

function isKnownTag(tag: string): tag is TagType {
  return [
    'definition',
    'example',
    'todo',
    'bullet',
    'numbered',
    'code',
  ].includes(tag);
}
function filterToHighlightSpans(
  arr: { start: number; end: number; tag: string }[]
): HighlightSpan[] {
  return arr.filter((s): s is HighlightSpan => isKnownTag(s.tag));
}

const HighlighterPage: React.FC = () => {
  const { isGuest } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [inputText, setInputText] = useState('');
  const [highlightedSpans, setHighlightedSpans] = useState<HighlightSpan[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [highlightTypes, setHighlightTypes] = useState<HighlightType[]>([
    {
      type: 'definition',
      label: 'Definition',
      color: 'bg-blue-500',
      enabled: true,
    },
    {
      type: 'example',
      label: 'Example',
      color: 'bg-green-500',
      enabled: true,
    },
    {
      type: 'todo',
      label: 'TODO',
      color: 'bg-yellow-400',
      enabled: true,
    },
    {
      type: 'bullet',
      label: 'Bullet',
      color: 'bg-orange-600',
      enabled: true,
    },
    {
      type: 'numbered',
      label: 'Numbered',
      color: 'bg-purple-500',
      enabled: true,
    },
    {
      type: 'code',
      label: 'Code',
      color: 'bg-gray-500',
      enabled: true,
    },
  ]);

  const outputRef = React.useRef<HTMLDivElement>(null);

  const handleInputChange = useCallback((text: string) => {
    setInputText(text);
    setHighlightedSpans(
      text.trim() ? filterToHighlightSpans(analyzeText(text)) : []
    );
  }, []);

  const handleLoadSample = useCallback(() => {
    setInputText(SAMPLE_TEXT);
    setHighlightedSpans(filterToHighlightSpans(analyzeText(SAMPLE_TEXT)));
  }, []);

  const handleClear = useCallback(() => {
    setInputText('');
    setHighlightedSpans([]);
  }, []);

  const toggleHighlightType = useCallback((type: HighlightType['type']) => {
    setHighlightTypes(prev =>
      prev.map(t => (t.type === type ? { ...t, enabled: !t.enabled } : t))
    );
  }, []);

  const renderHighlightedText = useCallback(() => {
    if (!inputText || highlightedSpans.length === 0) {
      return inputText;
    }
    const enabledTypes = new Set(
      highlightTypes.filter(t => t.enabled).map(t => t.type)
    );
    const validSpans = highlightedSpans
      .filter(span => isKnownTag(span.tag) && enabledTypes.has(span.tag))
      .sort((a, b) => a.start - b.start);
    if (validSpans.length === 0) {
      return inputText;
    }
    const parts: (string | JSX.Element)[] = [];
    let currentIndex = 0;
    validSpans.forEach(span => {
      if (currentIndex < span.start) {
        const chunk = inputText.slice(currentIndex, span.start);
        if (chunk.replace(/[`\s]/g, '').length > 0) {
          parts.push(chunk);
        }
      }
      const classMap: Record<TagType, string> = {
        definition: 'highlight-definition',
        example: 'highlight-example',
        todo: 'highlight-todo',
        bullet: 'highlight-bullet',
        numbered: 'highlight-numbered',
        code: 'highlight-code',
      };
      const typeLabels: Record<TagType, string> = {
        definition: 'Definition',
        example: 'Example',
        todo: 'TODO',
        bullet: 'Bullet',
        numbered: 'Numbered',
        code: 'Code',
      };
      if (isKnownTag(span.tag) && span.tag === 'code') {
        parts.push(
          <pre
            key={`code-${span.start}`}
            className="highlight-code font-mono bg-gray-100 rounded px-2 py-1 my-2 transition-colors duration-300 overflow-x-auto"
          >
            <code>
              {inputText.slice(span.start, span.end).replace(/^`+|`+$/g, '')}
            </code>
          </pre>
        );
      } else if (isKnownTag(span.tag)) {
        parts.push(
          <span
            key={`${span.start}`}
            className={`${classMap[span.tag]} relative group inline-block transition-colors duration-300 px-1 py-0.5 my-1 cursor-pointer rounded-md`}
            tabIndex={0}
            aria-label={typeLabels[span.tag]}
          >
            {inputText.slice(span.start, span.end)}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded shadow opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {typeLabels[span.tag]}
            </span>
          </span>
        );
      }
      currentIndex = span.end;
    });
    if (currentIndex < inputText.length) {
      parts.push(inputText.slice(currentIndex));
    }
    return parts;
  }, [inputText, highlightedSpans, highlightTypes]);

  // ...rest of SemanticHighlighter logic (UI, export, etc.)
  // For brevity, you can copy the rest of the component from the original file.

  // Main UI restored from original SemanticHighlighter:
  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 lg:p-8">
      {/* Header with title, subtitle, and upload button */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6 border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold">Semantic Highlighter</h1>
          <p className="text-gray-500 text-sm mt-1">
            Upload text or paste content to analyze semantic structures
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex-shrink-0">
          <FileUpload
            onFileUpload={({ text, fileName }) => {
              setInputText(text);
              setHighlightedSpans(
                text.trim() ? filterToHighlightSpans(analyzeText(text)) : []
              );
              setUploadedFileName(fileName);
              toast.success('File loaded successfully');
            }}
            onError={msg => toast.error(msg || 'Error extracting text from file')}
            disabled={isGuest}
            className="w-auto"
          />
          {uploadedFileName && (
            <div className="text-xs text-muted-foreground w-full text-right truncate mt-1">
              {uploadedFileName.length > 40
                ? uploadedFileName.slice(0, 18) + '...' + uploadedFileName.slice(-18)
                : uploadedFileName}
            </div>
          )}
        </div>
      </div>
      {/* Input Section */}
      <div className="bg-card border rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-md"
            onClick={handleLoadSample}
            aria-label="Load Sample"
          >
            <Sparkles className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Sample</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-md"
            onClick={handleClear}
            aria-label="Clear"
          >
            <Trash2 className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        </div>
        <Textarea
          value={inputText}
          onChange={e => handleInputChange(e.target.value)}
          placeholder="Paste your text here or upload a file..."
          className="flex-1 min-h-[200px] max-h-[500px] overflow-auto px-4 py-3 monospace-text resize-none bg-background border rounded text-sm sm:text-base"
        />
      </div>
      {/* Output Section */}
      <div className="bg-card border rounded-lg shadow-sm p-4 mb-6">
        <div
          ref={outputRef}
          className="whitespace-pre-wrap break-words text-base min-h-[120px]"
        >
          {renderHighlightedText()}
        </div>
      </div>
      {/* Highlight Tag Footer Bar */}
      <div className="p-3 shadow-sm border rounded-md bg-white mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <HighlightLegend
          types={highlightTypes}
          onToggleType={toggleHighlightType}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default HighlighterPage;
