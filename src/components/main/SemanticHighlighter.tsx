import React, { useState, useCallback } from 'react';
import type { JSX } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { FileUpload } from '../ui/file-upload';
import { HighlightLegend } from '../ui/highlight-legend';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Download,
  Sun,
  Moon,
  Trash2,
  CheckCircle,
  Inbox,
  Sparkles,
} from 'lucide-react';
import { extractHighlights } from '../../lib/highlighter';
// @ts-expect-error: No types for html2pdf.js, safe to ignore for import
declare module 'html2pdf.js';

interface HighlightSpan {
  start: number;
  end: number;
  text: string;
  type: 'definition' | 'example' | 'todo' | 'bullet' | 'numbered' | 'codeblock';
}

interface HighlightType {
  type: 'definition' | 'example' | 'todo' | 'bullet' | 'numbered' | 'codeblock';
  label: string;
  color: string;
  enabled: boolean;
}

// Sample text for demonstration
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

export const SemanticHighlighter: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [inputText, setInputText] = useState('');
  const [highlightedSpans, setHighlightedSpans] = useState<HighlightSpan[]>([]);
  const [copyMessage, setCopyMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

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
      type: 'codeblock',
      label: 'Code',
      color: 'bg-gray-500',
      enabled: true,
    },
  ]);

  const outputRef = React.useRef<HTMLDivElement>(null);

  const handleInputChange = useCallback((text: string) => {
    setInputText(text);
    setHighlightedSpans(text.trim() ? extractHighlights(text) : []);
    setCopyMessage('');
  }, []);

  const handleLoadSample = useCallback(() => {
    setInputText(SAMPLE_TEXT);
    setHighlightedSpans(extractHighlights(SAMPLE_TEXT));
    setCopyMessage('');
  }, []);

  const handleClear = useCallback(() => {
    setInputText('');
    setHighlightedSpans([]);
    setCopyMessage('');
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
      .filter(span => enabledTypes.has(span.type))
      .sort((a, b) => a.start - b.start);
    if (validSpans.length === 0) {
      return inputText;
    }
    const parts: (string | JSX.Element)[] = [];
    let currentIndex = 0;
    validSpans.forEach((span, index) => {
      if (currentIndex < span.start) {
        const chunk = inputText.slice(currentIndex, span.start);
        if (chunk.replace(/[`\s]/g, '').length > 0) {
          parts.push(chunk);
        }
      }
      const spanText = inputText.slice(span.start, span.end);
      const classMap = {
        definition: 'highlight-definition',
        example: 'highlight-example',
        todo: 'highlight-todo',
        bullet: 'highlight-bullet',
        numbered: 'highlight-numbered',
        codeblock: 'highlight-codeblock',
      };
      const typeLabels = {
        definition: 'Definition',
        example: 'Example',
        todo: 'TODO',
        bullet: 'Bullet',
        numbered: 'Numbered',
        codeblock: 'Code',
      };
      if (span.type === 'codeblock') {
        parts.push(
          <pre
            key={`codeblock-${span.start}-${index}`}
            className="highlight-codeblock font-mono bg-gray-100 rounded px-2 py-1 my-2 transition-colors duration-300 overflow-x-auto"
          >
            <code>{spanText.replace(/^`+|`+$/g, '')}</code>
          </pre>
        );
      } else {
        parts.push(
          <span
            key={`${span.start}-${index}`}
            className={`${classMap[span.type]} relative group inline-block transition-colors duration-300 px-1 py-0.5 my-1 cursor-pointer`}
            tabIndex={0}
            aria-label={typeLabels[span.type]}
          >
            {spanText}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded shadow opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {typeLabels[span.type]}
            </span>
          </span>
        );
      }
      currentIndex = span.end;
    });
    if (currentIndex < inputText.length) {
      const chunk = inputText.slice(currentIndex);
      if (chunk.replace(/[`\s]/g, '').length > 0) {
        parts.push(chunk);
      }
    }
    return parts.map((part, i) =>
      typeof part === 'string' ? (
        <span key={i}>{part}</span>
      ) : (
        <div key={i} className="mb-2">
          {part}
        </div>
      )
    );
  }, [inputText, highlightedSpans, highlightTypes]);

  const exportAsPDF = useCallback(async () => {
    try {
      // For now, we'll use a simple approach to create a PDF-like export
      // In a real implementation, you would use html2pdf.js or similar
      const element = document.createElement('div');
      const highlightedContent = renderHighlightedText();

      // Convert React elements to HTML string
      const tempDiv = document.createElement('div');
      if (Array.isArray(highlightedContent)) {
        // Handle array of React elements
        const reactElements = highlightedContent.map((item, index) => {
          if (typeof item === 'string') {
            return item;
          } else {
            // For React elements, we'll create a simple span representation
            return `<span class="${item.props.className}" title="${item.props.title || ''}">${item.props.children}</span>`;
          }
        });
        tempDiv.innerHTML = reactElements.join('');
      } else {
        tempDiv.innerHTML = highlightedContent as string;
      }

      element.innerHTML = tempDiv.innerHTML;
      element.style.padding = '20px';
      element.style.fontFamily = 'monospace';
      element.style.fontSize = '12px';
      element.style.lineHeight = '1.6';

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Semantic Highlighter Export</title>
              <style>
                body { font-family: monospace; font-size: 12px; line-height: 1.6; }
                .highlight-definition { background-color: #dbeafe; border: 1px solid #93c5fd; padding: 2px 4px; border-radius: 4px; }
                .highlight-example { background-color: #dcfce7; border: 1px solid #86efac; padding: 2px 4px; border-radius: 4px; }
                .highlight-todo { background-color: #fef3c7; border: 1px solid #fcd34d; padding: 2px 4px; border-radius: 4px; }
                .highlight-bullet { background-color: #fed7aa; border: 1px solid #fdba74; padding: 2px 4px; border-radius: 4px; }
                .highlight-numbered { background-color: #e9d5ff; border: 1px solid #c084fc; padding: 2px 4px; border-radius: 4px; }
                .highlight-codeblock { background-color: #f3f4f6; border: 1px solid #d1d5db; padding: 2px 4px; border-radius: 4px; font-family: monospace; }
              </style>
            </head>
            <body>
              ${element.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    } catch (error) {
      setCopyMessage('Failed to export PDF');
    }
  }, [renderHighlightedText]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with theme toggle */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Semantic Highlighter
          </h1>
          <p className="text-muted-foreground">
            Upload text or paste content to analyze semantic structures
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="flex items-center space-x-2"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </span>
        </Button>
      </div>

      {/* Success Message */}
      {copyMessage && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-600">{copyMessage}</span>
        </div>
      )}

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Input Box */}
        <div className="flex-1 flex flex-col min-h-[300px] bg-card border rounded-lg p-4 w-full max-w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Input Text</h2>
            <div className="flex items-center space-x-2">
              <FileUpload
                onFileUpload={({ text }) => {
                  setInputText(text);
                  setHighlightedSpans(
                    text.trim() ? extractHighlights(text) : []
                  );
                  setCopyMessage('');
                  setToastMessage('File uploaded successfully');
                }}
                onError={msg => {
                  if (msg !== 'File uploaded successfully') setToastMessage(msg);
                }}
                disabled={false}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoadSample}
                aria-label="Load Sample"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Sample
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                aria-label="Clear"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
          <Textarea
            value={inputText}
            onChange={e => handleInputChange(e.target.value)}
            placeholder="Paste your text here or upload a file..."
            className="flex-1 min-h-[200px] max-h-[500px] overflow-auto p-4 monospace-text resize-none bg-background border rounded"
          />
        </div>
        {/* Output Box */}
        <div className="flex-1 flex flex-col min-h-[300px] bg-card border rounded-lg p-4 w-full max-w-full mt-6 lg:mt-0">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Highlighted Output</h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const dataStr =
                      'data:application/json;charset=utf-8,' +
                      encodeURIComponent(JSON.stringify(highlightedSpans, null, 2));
                    const dlAnchor = document.createElement('a');
                    dlAnchor.setAttribute('href', dataStr);
                    dlAnchor.setAttribute('download', 'highlights.json');
                    dlAnchor.click();
                  }}
                  disabled={!inputText.trim() || highlightedSpans.length === 0}
                  aria-label="Download Highlights JSON"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Highlights
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportAsPDF}
                  disabled={!inputText.trim() || highlightedSpans.length === 0}
                  aria-label="Export PDF"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>
          <div
            ref={outputRef}
            className="flex-1 border rounded-lg p-4 max-h-[500px] overflow-auto bg-background leading-relaxed relative"
          >
            {!inputText ? (
              <div className="text-center py-8 text-muted-foreground">
                <Inbox className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter text or upload a file to see highlights</p>
              </div>
            ) : highlightedSpans.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No highlights found. Try including examples, definitions, TODOs, bullets, or code snippets.</p>
              </div>
            ) : (
              <div className="monospace-text whitespace-pre-wrap">
                {renderHighlightedText()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Show toast for errors */}
      {toastMessage && (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow z-50 ${toastMessage === 'File uploaded successfully' ? 'bg-green-600' : 'bg-destructive'} text-white`}>
          {toastMessage}
          <button
            className="ml-4 underline"
            onClick={() => setToastMessage('')}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Highlight Types Legend - full width below input/output */}
      <div className="w-full mt-8 flex justify-center px-2">
        <div className="w-full max-w-4xl overflow-x-auto">
          <HighlightLegend
            types={highlightTypes}
            onToggleType={toggleHighlightType}
            className="flex flex-row flex-nowrap gap-2 justify-center min-w-[400px] sm:min-w-0"
          />
        </div>
      </div>
    </div>
  );
};
