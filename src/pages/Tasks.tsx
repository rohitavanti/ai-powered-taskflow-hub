
import React, { useState } from 'react';
import { Plus, Search, Filter, CheckSquare, Clock, Flag } from 'lucide-react';
import Layout from '../components/Layout';
import TaskDialog from '../components/TaskDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Draft and finalize the Q1 project proposal',
      priority: 'high',
      dueDate: '2025-01-15',
      completed: false,
      project: 'work'
    },
    {
      id: '2',
      title: 'Review design mockups',
      description: 'Review the new UI mockups from the design team',
      priority: 'medium',
      dueDate: '2025-01-10',
      completed: false,
      project: 'work'
    },
    {
      id: '3',
      title: 'Daily workout',
      description: '30 minutes cardio and strength training',
      priority: 'low',
      completed: true,
      project: 'health'
    }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData }
          : task
      ));
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title || '',
        description: taskData.description,
        priority: taskData.priority || 'medium',
        dueDate: taskData.dueDate,
        completed: false,
        project: taskData.project,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'completed' && task.completed) ||
      (filterStatus === 'pending' && !task.completed);
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getProjectBadgeColor = (project?: string) => {
    switch (project) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'health': return 'bg-green-100 text-green-800';
      case 'learning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
            <p className="text-muted-foreground">
              {filteredTasks.length} tasks • {filteredTasks.filter(t => !t.completed).length} pending
            </p>
          </div>
          <Button onClick={handleCreateTask}>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterPriority !== 'all' || filterStatus !== 'all' 
                  ? 'Try adjusting your filters or search term.'
                  : 'Create your first task to get started.'}
              </p>
              {(!searchTerm && filterPriority === 'all' && filterStatus === 'all') && (
                <Button onClick={handleCreateTask}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Task
                </Button>
              )}
            </div>
          ) : (
            filteredTasks.map(task => (
              <div 
                key={task.id} 
                className={`bg-card border rounded-lg p-4 hover:shadow-md transition-shadow ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggleComplete(task.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 
                        className={`font-medium cursor-pointer hover:text-primary ${
                          task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}
                        onClick={() => handleEditTask(task)}
                      >
                        {task.title}
                      </h3>
                      
                      <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                      
                      {task.project && (
                        <Badge variant="secondary" className={getProjectBadgeColor(task.project)}>
                          {task.project}
                        </Badge>
                      )}
                    </div>
                    
                    {task.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {task.dueDate && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Due {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}
                      <span className="capitalize">Priority: {task.priority}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditTask(task)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <TaskDialog
          task={editingTask}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSaveTask}
        />
      </div>
    </Layout>
  );
};

export default Tasks;
