
import React from 'react';
import { Calendar, Clock, Flag, MoreHorizontal, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  completed: boolean;
  project?: string;
  assignee?: string;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onClick: (task: Task) => void;
}

const TaskCard = ({ task, onToggleComplete, onClick }: TaskCardProps) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <Card className={cn(
      "hover:shadow-md transition-shadow cursor-pointer group",
      task.completed && "opacity-60",
      isOverdue && "border-red-200 bg-red-50/30"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0" onClick={() => onClick(task)}>
            <div className="flex items-center justify-between mb-2">
              <h3 className={cn(
                "font-medium text-sm truncate",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {task.description && (
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className={cn("text-xs", priorityColors[task.priority])}>
                  <Flag className="w-3 h-3 mr-1" />
                  {task.priority}
                </Badge>
                
                {task.project && (
                  <Badge variant="secondary" className="text-xs">
                    {task.project}
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {task.dueDate && (
                  <div className={cn(
                    "flex items-center",
                    isOverdue && "text-red-600"
                  )}>
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
                
                {task.assignee && (
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {task.assignee}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
