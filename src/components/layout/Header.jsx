// src/components/layout/Header.jsx
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Menu } from 'lucide-react';

const Header = ({ onMenuClick, onCollapse, isCollapsed }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left: Mobile Menu + Collapse Toggle */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onCollapse}
            className="hidden lg:flex"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <h1 className="text-xl font-semibold text-gray-800">
            Dashboard
          </h1>
        </div>

        {/* Right: User Info */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm font-medium">{user?.name || 'User'}</span>
          </div>
          <Button variant="destructive" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;