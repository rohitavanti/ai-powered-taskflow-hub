
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  CheckSquare, 
  Plus, 
  Folder, 
  BarChart3, 
  Settings,
  Home,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard', exact: true },
    { to: '/tasks', icon: CheckSquare, label: 'My Tasks' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/projects', icon: Folder, label: 'Projects' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const handleNewTask = () => {
    navigate('/tasks');
  };

  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">TaskFlow</h1>
        <p className="text-sm text-muted-foreground">Advanced Task Manager</p>
      </div>
      
      <div className="p-4">
        <Button className="w-full mb-6" size="sm" onClick={handleNewTask}>
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )
                }
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Quick Access
          </h3>
          <div className="space-y-1">
            <NavLink 
              to="/tasks"
              className="flex items-center justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-3" />
                Today
              </div>
              <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">3</span>
            </NavLink>
            <NavLink 
              to="/tasks"
              className="flex items-center justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-3" />
                This Week
              </div>
              <span className="bg-muted text-muted-foreground text-xs rounded-full px-2 py-1">12</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
