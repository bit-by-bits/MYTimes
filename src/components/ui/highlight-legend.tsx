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
  type: 'definition' | 'example' | 'todo' | 'bullet' | 'numbered' | 'code';
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
        return <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />;
      case 'example':
        return <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4" />;
      case 'todo':
        return <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />;
      case 'bullet':
        return <List className="h-3 w-3 sm:h-4 sm:w-4" />;
      case 'numbered':
        return <Hash className="h-3 w-3 sm:h-4 sm:w-4" />;
      case 'code':
        return <Code className="h-3 w-3 sm:h-4 sm:w-4" />;
      default:
        return <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />;
    }
  };

  return (
    <div className={`bg-card border rounded-lg p-3 sm:p-4 ${className}`}>
      <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-muted-foreground">
        Highlight Types
      </h3>
      {!collapsed && (
        <div
          className="flex flex-row flex-nowrap gap-1 sm:gap-2 overflow-x-auto pb-2 w-full"
          role="list"
          aria-label="Highlight Types"
        >
          {types.map(type => (
            <button
              key={type.type}
              onClick={() => onToggleType(type.type)}
              className={`flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 rounded-md text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                type.enabled
                  ? 'bg-muted hover:bg-muted/80'
                  : 'opacity-50 hover:opacity-75'
              }`}
              title={type.label}
              aria-label={type.label}
              role="listitem"
            >
              <div
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${type.color}`}
              />
              <div className="hidden sm:block">{getIcon(type.type)}</div>
              <span className="text-xs">{type.label}</span>
            </button>
          ))}
        </div>
      )}
      <button
        className="sm:hidden mb-2 px-2 sm:px-3 py-1 border rounded text-xs sm:text-sm"
        onClick={() => setCollapsed(c => !c)}
        aria-label={collapsed ? 'Show legend' : 'Hide legend'}
        title={collapsed ? 'Show legend' : 'Hide legend'}
      >
        {collapsed ? 'Show Legend' : 'Hide Legend'}
      </button>
    </div>
  );
};
