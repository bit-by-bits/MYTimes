import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import {
  LogOut,
  User,
  Home,
  Info,
  Github,
  Settings,
  Highlighter,
} from 'lucide-react';

type CurrentPage = 'home' | 'about';

interface HeaderProps {
  onNavigate: (page: CurrentPage) => void;
  currentPage: CurrentPage;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Highlighter className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">
              Semantic Highlighter
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-4">
              <Button 
                variant={currentPage === 'home' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => onNavigate('home')}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button 
                variant={currentPage === 'about' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => onNavigate('about')}
              >
                <Info className="h-4 w-4 mr-2" />
                About
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open('https://github.com/your-username/semantic-highlighter', '_blank')}
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem className="flex-col items-start">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {user?.email}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
