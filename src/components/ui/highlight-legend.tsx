import React, { useState } from 'react';
import {
  BookOpen,
  Lightbulb,
  AlertCircle,
  List,
  Hash,
  Code,
} from 'lucide-react';

interface HighlightType {
  type: 'definition' | 'example' | 'todo' | 'bullet' | 'numbered' | 'codeblock';
  label: string;
  color: string;
  enabled: boolean;
}

interface HighlightLegendProps {
  types: HighlightType[];
  onToggleType: (type: HighlightType['type']) => void;
  className?: string;
}

export const HighlightLegend: React.FC<HighlightLegendProps> = ({
  types,
  onToggleType,
  className = '',
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const getIcon = (type: HighlightType['type']) => {
    switch (type) {
      case 'definition':
        return <BookOpen className="h-4 w-4" />;
      case 'example':
        return <Lightbulb className="h-4 w-4" />;
      case 'todo':
        return <AlertCircle className="h-4 w-4" />;
      case 'bullet':
        return <List className="h-4 w-4" />;
      case 'numbered':
        return <Hash className="h-4 w-4" />;
      case 'codeblock':
        return <Code className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className={`bg-card border rounded-lg p-4 ${className}`}>
      <h3 className="text-sm font-medium mb-3 text-muted-foreground">
        Highlight Types
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {types.map(type => (
          <button
            key={type.type}
            onClick={() => onToggleType(type.type)}
            className={`flex items-center space-x-2 p-2 rounded-md text-sm transition-colors ${
              type.enabled
                ? 'bg-muted hover:bg-muted/80'
                : 'opacity-50 hover:opacity-75'
            }`}
            title={type.label}
            aria-label={type.label}
          >
            <div className={`w-3 h-3 rounded-full ${type.color}`} />
            {getIcon(type.type)}
            <span className="text-xs">{type.label}</span>
          </button>
        ))}
      </div>
      <button
        className="sm:hidden mb-2 px-3 py-1 border rounded text-sm"
        onClick={() => setCollapsed(c => !c)}
        aria-label={collapsed ? 'Show legend' : 'Hide legend'}
        title={collapsed ? 'Show legend' : 'Hide legend'}
      >
        {collapsed ? 'Show Legend' : 'Hide Legend'}
      </button>
      <div className={`flex flex-wrap items-center gap-3 ${className} ${collapsed ? 'hidden' : ''} sm:flex`}>
        {types.map(type => (
          <button
            key={type.type}
            onClick={() => onToggleType(type.type)}
            className={`flex items-center space-x-2 p-2 rounded-md text-sm transition-colors ${
              type.enabled
                ? 'bg-muted hover:bg-muted/80'
                : 'opacity-50 hover:opacity-75'
            }`}
            title={type.label}
            aria-label={type.label}
          >
            <div className={`w-3 h-3 rounded-full ${type.color}`} />
            {getIcon(type.type)}
            <span className="text-xs">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
