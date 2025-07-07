import React, { useState, useCallback } from 'react';
import type { JSX } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { FileUpload } from '../ui/file-upload';
import { HighlightLegend } from '../ui/highlight-legend';
import { highlightAPI } from '../../lib/api';
import { fileUtils, FileUploadResult } from '../../lib/file-utils';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Sparkles,
  Loader2,
  Copy,
  Download,
  Sun,
  Moon,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

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
      color: 'bg-yellow-500',
      enabled: true,
    },
    {
      type: 'bullet',
      label: 'Bullet',
      color: 'bg-orange-500',
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

  const handleAnalyze = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setErrorMessage('');
    try {
      const response = await highlightAPI.analyze(inputText);
      setHighlightedSpans(response.highlights);
    } catch (error) {
      console.error('Analysis failed:', error);
      setErrorMessage('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [inputText]);

  const handleLoadSample = useCallback(() => {
    setInputText(SAMPLE_TEXT);
    setHighlightedSpans([]);
    setUploadedFileName('');
    setErrorMessage('');
    // Auto-analyze after a short delay
    setTimeout(() => {
      if (SAMPLE_TEXT.trim()) {
        handleAnalyze();
      }
    }, 100);
  }, [handleAnalyze]);

  const handleClear = useCallback(() => {
    setInputText('');
    setHighlightedSpans([]);
    setUploadedFileName('');
    setErrorMessage('');
    setCopyMessage('');
  }, []);

  const handleFileUpload = useCallback(
    (result: FileUploadResult) => {
      setInputText(result.text);
      setUploadedFileName(result.fileName);
      setHighlightedSpans([]);
      setErrorMessage('');
      // Auto-analyze after file upload
      setTimeout(() => {
        if (result.text.trim()) {
          handleAnalyze();
        }
      }, 100);
    },
    [handleAnalyze]
  );

  const handleFileError = useCallback((message: string) => {
    setErrorMessage(message);
  }, []);

  const toggleHighlightType = useCallback((type: HighlightType['type']) => {
    setHighlightTypes(prev =>
      prev.map(t => (t.type === type ? { ...t, enabled: !t.enabled } : t))
    );
  }, []);

  const copyHighlightedText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      setCopyMessage('Text copied to clipboard!');
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (error) {
      setCopyMessage('Failed to copy text');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  }, [inputText]);

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
      // Add text before the span
      if (currentIndex < span.start) {
        parts.push(inputText.slice(currentIndex, span.start));
      }

      // Add the highlighted span
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
          <pre key={`codeblock-${span.start}-${index}`} className="highlight-codeblock font-mono bg-gray-100 rounded px-2 py-1 my-2 transition-colors duration-300 overflow-x-auto">
            <code>{spanText}</code>
          </pre>
        );
      } else {
        parts.push(
          <span
            key={`${span.start}-${index}`}
            className={`${classMap[span.type]} relative group inline-block transition-colors duration-300`}
            title={`${typeLabels[span.type]}: ${spanText.slice(0, 100)}${spanText.length > 100 ? '...' : ''}`}
          >
            {spanText}
            <span className="absolute -top-6 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              {typeLabels[span.type]}
            </span>
          </span>
        );
      }

      currentIndex = span.end;
    });

    // Add remaining text
    if (currentIndex < inputText.length) {
      parts.push(inputText.slice(currentIndex));
    }

    return parts;
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
      setErrorMessage('Failed to export PDF');
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

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <span className="text-sm text-destructive">{errorMessage}</span>
        </div>
      )}

      {/* Success Message */}
      {copyMessage && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-600">{copyMessage}</span>
        </div>
      )}

      {/* File Upload */}
      <div className="mb-6">
        <FileUpload
          onFileUpload={handleFileUpload}
          onError={handleFileError}
          disabled={isAnalyzing}
        />
        {uploadedFileName && (
          <p className="text-xs text-muted-foreground mt-2">
            Uploaded: {uploadedFileName}
          </p>
        )}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left pane - Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Input Text</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoadSample}
                disabled={isAnalyzing}
                aria-label="Load Sample"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Sample
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                disabled={isAnalyzing}
                aria-label="Clear"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>

          <Textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Paste your text here or upload a file..."
            className="max-h-[500px] overflow-auto p-4 monospace-text resize-none"
            disabled={isAnalyzing}
          />
        </div>

        {/* Right pane - Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Highlighted Output</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyHighlightedText}
                disabled={!inputText.trim()}
                aria-label="Copy"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
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

          <div className="border rounded-lg p-4 max-h-[500px] overflow-auto bg-card leading-relaxed relative">
            {isAnalyzing && <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-black/40 z-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
            {!inputText ? (
              <div className="text-center py-8 text-muted-foreground">
                <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter text or upload a file to see highlights</p>
              </div>
            ) : highlightedSpans.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click "Highlight" to analyze your text</p>
              </div>
            ) : (
              <div className="monospace-text whitespace-pre-wrap">
                {renderHighlightedText()}
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">{errorMessage}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAnalyze}
                disabled={!inputText.trim() || isAnalyzing}
                aria-label="Try Again"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <HighlightLegend
          types={highlightTypes}
          onToggleType={toggleHighlightType}
          className="w-full sm:w-auto"
        />

        <div className="flex items-center space-x-2">
          <Button
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isAnalyzing}
            className="min-w-[120px]"
            aria-label={isAnalyzing ? "Analyzing..." : "Highlight"}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Highlight
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
