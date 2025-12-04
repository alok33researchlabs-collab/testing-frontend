// src/pages/dashboard/DashboardPage.jsx
import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, FolderKanban, Activity, DollarSign, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DashboardPage = () => {
  // Sample Data
  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 7500 },
  ];

  const projectStatusData = [
    { name: 'Completed', value: 35, color: '#10b981' },
    { name: 'In Progress', value: 45, color: '#3b82f6' },
    { name: 'Pending', value: 20, color: '#f59e0b' },
  ];

  const teamActivity = [
    { day: 'Mon', tasks: 12 },
    { day: 'Tue', tasks: 19 },
    { day: 'Wed', tasks: 15 },
    { day: 'Thu', tasks: 25 },
    { day: 'Fri', tasks: 22 },
    { day: 'Sat', tasks: 8 },
    { day: 'Sun', tasks: 5 },
  ];

  const recentProjects = [
    { id: 1, name: 'Website Redesign', progress: 85, status: 'active', team: 'Design' },
    { id: 2, name: 'Mobile App v2', progress: 60, status: 'active', team: 'Mobile' },
    { id: 3, name: 'API Integration', progress: 100, status: 'completed', team: 'Backend' },
    { id: 4, name: 'Marketing Campaign', progress: 40, status: 'pending', team: 'Marketing' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin!</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Projects</CardTitle>
            <FolderKanban className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-600 mt-1">8 in progress</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Team Members</CardTitle>
            <Users className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600 mt-1">2 new this month</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
            <Activity className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-emerald-600 mt-1">+4% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Line Chart */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue trend for 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Status Pie Chart */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Distribution of all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Activity + Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Activity Bar Chart */}
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle>Team Activity This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={teamActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Latest project updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{project.team[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{project.name}</p>
                    <p className="text-xs text-gray-500">{project.team} Team</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{project.progress}%</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          project.status === 'completed' ? 'bg-emerald-500' :
                          project.status === 'active' ? 'bg-blue-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <Badge variant={project.status === 'completed' ? 'default' : project.status === 'active' ? 'secondary' : 'outline'}>
                    {project.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;