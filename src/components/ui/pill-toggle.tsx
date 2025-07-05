import React from 'react';
import { Button } from './button';
import { cn } from '../../lib/utils';

interface PillToggleProps {
  enabled: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  label: string;
  tooltip?: string;
  color: string;
  className?: string;
}

export const PillToggle: React.FC<PillToggleProps> = ({
  enabled,
  onToggle,
  icon,
  label,
  tooltip,
  color,
  className,
}) => {
  return (
    <div className={cn('group relative', className)}>
      <Button
        variant={enabled ? 'default' : 'outline'}
        size="sm"
        onClick={onToggle}
        className={cn(
          'flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200',
          enabled ? 'shadow-md' : 'hover:shadow-sm',
          'hover:scale-105 active:scale-95',
          className
        )}
        title={tooltip}
      >
        {icon}
        <span className="text-sm font-medium">{label}</span>
        <div className={cn('w-3 h-3 rounded-full', color)} />
      </Button>

      {tooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};
