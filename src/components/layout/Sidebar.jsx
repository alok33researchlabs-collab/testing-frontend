// src/components/layout/Sidebar.jsx
import { cn } from '@/lib/utils';
import { 
  Home, 
  FolderKanban, 
  Users, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: FolderKanban, label: 'Projects', href: '/dashboard/projects' },
  { icon: Users, label: 'Team', href: '/dashboard/team' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

const Sidebar = ({ collapsed, onCollapse, isMobile = false }) => {
  const sidebarWidth = collapsed ? 'w-20' : 'w-64';
  const textHidden = collapsed && !isMobile;

  return (
    <aside className={cn(
      'flex flex-col bg-white border-r transition-all duration-300',
      isMobile ? 'w-64' : sidebarWidth,
      'h-screen sticky top-0'
    )}>
      {/* Logo & Collapse Button */}
      <div className="flex items-center justify-between p-5 border-b">
        <div className={cn('flex items-center gap-3', textHidden && 'justify-center')}>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          {!textHidden && <span className="text-xl font-bold">My App</span>}
        </div>

        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCollapse(!collapsed)}
            className="hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all group',
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100',
                textHidden && 'justify-center'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'text-white')} />
              {!textHidden && <span className="font-medium">{item.label}</span>}
              
              {/* Tooltip when collapsed */}
              {textHidden && (
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </span>
              )}
            </a>
          );
        })}
      </nav>

      {/* Optional Bottom Section */}
      <div className="p-4 border-t">
        <div className={cn('flex items-center gap-3', textHidden && 'justify-center')}>
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          {!textHidden && (
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">admin@app.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;