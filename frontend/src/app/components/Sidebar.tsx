import { useState } from 'react';
import { FileText, Plus, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { logout } from '../../services/authService';


interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'create', label: 'Create Document', icon: Plus },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border z-50 transition-all duration-300 flex flex-col ${
          isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'w-64'
        }`}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg">
              <Sparkles className="size-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-sidebar-foreground">AI Document</span>
                <span className="text-xs text-muted-foreground">Assistant</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden p-2 hover:bg-sidebar-accent rounded-lg transition-smooth"
          >
            <X className="size-5 text-sidebar-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsCollapsed(true);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon className="size-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => {
              logout();     // ✅ clear JWT here
              onLogout();   // existing navigation logic
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-smooth"
          >
            <LogOut className="size-5 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed bottom-6 right-6 lg:hidden size-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center z-40 hover:opacity-90 transition-smooth"
      >
        <Menu className="size-6" />
      </button>
    </>
  );
}