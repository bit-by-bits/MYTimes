import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
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

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const navigate = useNavigate();

  const navItems = [
    {
      label: 'Home',
      icon: <Home className="mr-2 h-4 w-4" />,
      to: '/',
    },
    {
      label: 'About',
      icon: <Info className="mr-2 h-4 w-4" />,
      to: '/about',
    },
    {
      label: 'Feedback',
      icon: <MessageCircle className="mr-2 h-4 w-4" />,
      to: '/feedback',
    },
    {
      label: 'GitHub',
      icon: <Github className="mr-2 h-4 w-4" />,
      to: 'https://github.com/buildscraps/Semantic-Highlighter',
      external: true,
    },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 relative">
          <div className="flex items-center space-x-2 cursor-pointer min-w-0">
            <Link to="/" className="flex items-center space-x-2 min-w-0">
              <img
                src={theme === 'dark' ? '/logo-inverted.svg' : '/logo.svg'}
                alt="Logo"
                className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0"
              />
              <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">
                Semantic Highlighter
              </h1>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-center space-x-1">
            {navItems.map(({ label, icon, to, external }) =>
              external ? (
                <Button
                  key={label}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="px-2 sm:px-3"
                >
                  <a href={to} target="_blank" rel="noopener noreferrer">
                    {icon}
                    <span className="hidden sm:inline">{label}</span>
                  </a>
                </Button>
              ) : (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    `px-2 sm:px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-muted'
                    }`
                  }
                  end={to === '/'}
                >
                  {icon}
                  <span className="hidden sm:inline">{label}</span>
                </NavLink>
              )
            )}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="flex mr-2"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
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
                    alt={user.name || 'User'}
                    referrerPolicy="no-referrer"
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover cursor-pointer hover:bg-primary/80 ml-1"
                  />
                ) : (
                  <div className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary text-primary-foreground cursor-pointer hover:bg-primary/80 ml-1">
                    <span className="text-xs sm:text-sm font-medium leading-none">
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

                <DropdownMenuItem
                  onClick={() => navigate('/settings')}
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
            {/* Mobile Hamburger (moved to right) */}
            <div className="lg:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                onClick={() => setMobileNavOpen(v => !v)}
              >
                <span className="sr-only">Open navigation menu</span>
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
              {mobileNavOpen && (
                <div className="absolute top-14 sm:top-16 right-0 w-48 bg-background border rounded-lg shadow-lg z-50 flex flex-col p-2 space-y-1 animate-fade-in">
                  {navItems.map(({ label, icon, to, external }) =>
                    external ? (
                      <a
                        key={label}
                        href={to}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileNavOpen(false)}
                        className="w-full flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted"
                      >
                        {icon}
                        {label}
                      </a>
                    ) : (
                      <NavLink
                        key={label}
                        to={to}
                        className={({ isActive }) =>
                          `w-full justify-start px-2 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                            isActive
                              ? 'bg-accent text-accent-foreground'
                              : 'hover:bg-muted'
                          }`
                        }
                        end={to === '/'}
                        onClick={() => setMobileNavOpen(false)}
                      >
                        {icon}
                        {label}
                      </NavLink>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
