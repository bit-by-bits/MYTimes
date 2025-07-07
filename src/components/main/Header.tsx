import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  LogOut,
  Home,
  Info,
  Github,
  Settings,
  MessageCircle,
  Sun,
  Moon,
} from 'lucide-react';

type CurrentPage = 'home' | 'about';

interface HeaderProps {
  onNavigate: (page: CurrentPage) => void;
  currentPage: CurrentPage;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    {
      label: 'Home',
      icon: <Home className="mr-2 h-4 w-4" />,
      onClick: () => onNavigate('home'),
    },
    {
      label: 'About',
      icon: <Info className="mr-2 h-4 w-4" />,
      onClick: () => onNavigate('about'),
    },
    {
      label: 'GitHub',
      icon: <Github className="mr-2 h-4 w-4" />,
      onClick: () =>
        window.open(
          'https://github.com/your-username/semantic-highlighter',
          '_blank'
        ),
    },
    {
      label: 'Feedback',
      icon: <MessageCircle className="mr-2 h-4 w-4" />,
      onClick: () => window.open('mailto:feedback@buildscraps.com', '_blank'),
    },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
            <h1 className="text-xl font-bold tracking-tight">
              Semantic Highlighter
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center space-x-1">
            {navItems.map(({ label, icon, onClick }) => (
              <Button
                key={label}
                variant={
                  currentPage === label.toLowerCase() ? 'default' : 'ghost'
                }
                size="sm"
                onClick={onClick}
                className="px-3"
              >
                {icon}
                {label}
              </Button>
            ))}
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation menu"
              onClick={() => setMobileNavOpen(v => !v)}
            >
              <span className="sr-only">Open navigation menu</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </Button>
            {mobileNavOpen && (
              <div className="absolute top-16 right-0 w-48 bg-background border rounded-lg shadow-lg z-50 flex flex-col p-2 space-y-1 animate-fade-in">
                {navItems.map(({ label, icon, onClick }) => (
                  <Button
                    key={label}
                    variant={currentPage === label.toLowerCase() ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => { setMobileNavOpen(false); onClick(); }}
                    className="w-full justify-start"
                  >
                    {icon}
                    {label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="flex"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover cursor-pointer hover:bg-primary/80"
                  />
                ) : (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground cursor-pointer hover:bg-primary/80">
                    <span className="text-sm font-medium leading-none">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-64" align="end">
                <div className="flex items-center gap-2 p-2">
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground">
                      <span className="text-lg font-medium leading-none">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <div className="md:hidden">
                  {navItems.map(({ label, icon, onClick }) => (
                    <DropdownMenuItem
                      key={label}
                      onClick={onClick}
                      className="cursor-pointer hover:bg-muted"
                    >
                      {icon}
                      {label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </div>

                <DropdownMenuItem
                  onClick={() => console.log('Settings')}
                  className="cursor-pointer hover:bg-muted"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
