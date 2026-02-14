import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  action?: React.ReactNode;
}

export function Header({ title, subtitle, isDarkMode, onToggleTheme, action }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        
        <div className="flex items-center gap-3">
          {action}
          <button
            onClick={onToggleTheme}
            className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-smooth"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="size-5 text-foreground" />
            ) : (
              <Moon className="size-5 text-foreground" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
