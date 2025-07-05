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
  MessageCircle,
} from 'lucide-react';

type CurrentPage = 'home' | 'about';

interface HeaderProps {
  onNavigate: (page: CurrentPage) => void;
  currentPage: CurrentPage;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Highlighter className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold tracking-tight">
                Semantic Highlighter
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Button 
                variant={currentPage === 'home' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => onNavigate('home')}
                className="px-3"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button 
                variant={currentPage === 'about' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => onNavigate('about')}
                className="px-3"
              >
                <Info className="h-4 w-4 mr-2" />
                About
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open('https://github.com/your-username/semantic-highlighter', '_blank')}
                className="px-3"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open('mailto:feedback@buildscraps.com', '_blank')}
                className="px-3"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Feedback
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  {user?.picture ? (
                    <img 
                      src={user.picture} 
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground">
                      <span className="text-sm font-medium">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user?.picture ? (
                      <img 
                        src={user.picture} 
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground">
                        <span className="text-lg font-medium">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                
                {/* Mobile navigation items */}
                <div className="md:hidden">
                  <DropdownMenuItem onClick={() => onNavigate('home')}>
                    <Home className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('about')}>
                    <Info className="mr-2 h-4 w-4" />
                    <span>About</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.open('https://github.com/your-username/semantic-highlighter', '_blank')}>
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.open('mailto:feedback@buildscraps.com', '_blank')}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    <span>Feedback</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </div>
                
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={logout}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
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
