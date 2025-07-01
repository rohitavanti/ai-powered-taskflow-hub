
import React from 'react';
import { TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Analytics = () => {
  // Mock analytics data
  const weeklyData = [
    { name: 'Mon', tasks: 12, completed: 8 },
    { name: 'Tue', tasks: 15, completed: 12 },
    { name: 'Wed', tasks: 10, completed: 9 },
    { name: 'Thu', tasks: 18, completed: 14 },
    { name: 'Fri', tasks: 16, completed: 13 },
    { name: 'Sat', tasks: 8, completed: 6 },
    { name: 'Sun', tasks: 5, completed: 4 }
  ];

  const productivityData = [
    { day: 'Week 1', productivity: 75 },
    { day: 'Week 2', productivity: 82 },
    { day: 'Week 3', productivity: 68 },
    { day: 'Week 4', productivity: 85 },
  ];

  const priorityData = [
    { name: 'High', value: 15, color: '#ef4444' },
    { name: 'Medium', value: 28, color: '#f59e0b' },
    { name: 'Low', value: 12, color: '#10b981' }
  ];

  const totalTasks = 89;
  const completedTasks = 67;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);
  const averageTimePerTask = 2.5;

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your productivity and task completion patterns</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                  <p className="text-2xl font-bold">{totalTasks}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% from last week
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{completedTasks}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8% from last week
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold">{completionRate}%</p>
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -3% from last week
                  </p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Time/Task</p>
                  <p className="text-2xl font-bold">{averageTimePerTask}h</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Improved efficiency
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Task Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#3b82f6" name="Total Tasks" />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Productivity Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="productivity" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Priority Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This Week's Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Complete 25 tasks</span>
                  <span>20/25</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Maintain 85% completion rate</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Reduce avg. task time to 2h</span>
                  <span>2.5h</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Key Insights</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Most productive on Thursdays</li>
                  <li>• High priority tasks need more focus</li>
                  <li>• Weekend productivity could improve</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
