import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { useTheme } from '../contexts/ThemeContext';
import type { Theme } from '../contexts/ThemeContext';

const HIGHLIGHT_TYPES = [
  { key: 'definition', label: 'Definition', color: 'bg-blue-500' },
  { key: 'example', label: 'Example', color: 'bg-green-500' },
  { key: 'todo', label: 'TODO', color: 'bg-yellow-400' },
  { key: 'bullet', label: 'Bullet', color: 'bg-orange-600' },
  { key: 'numbered', label: 'Numbered', color: 'bg-purple-500' },
  { key: 'code', label: 'Code', color: 'bg-gray-500' },
];

const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [highlight, setHighlight] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.theme) setTheme(parsed.theme as Theme);
      setHighlight(parsed.highlight || {});
    } else {
      setHighlight(
        HIGHLIGHT_TYPES.reduce((acc, t) => ({ ...acc, [t.key]: true }), {})
      );
    }
  }, [setTheme]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify({ theme, highlight }));
  }, [theme, highlight]);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Theme</label>
          <div className="flex gap-2">
            {THEME_OPTIONS.map(opt => (
              <Button
                key={opt.value}
                variant={theme === opt.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme(opt.value as Theme)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Highlight Types</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {HIGHLIGHT_TYPES.map(type => (
              <div key={type.key} className="flex items-center gap-2">
                <Switch
                  checked={highlight[type.key] ?? true}
                  onCheckedChange={v =>
                    setHighlight(h => ({ ...h, [type.key]: v }))
                  }
                  id={type.key}
                />
                <span
                  className={`w-3 h-3 rounded-full ${type.color} inline-block`}
                />
                <label htmlFor={type.key} className="text-sm cursor-pointer">
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
