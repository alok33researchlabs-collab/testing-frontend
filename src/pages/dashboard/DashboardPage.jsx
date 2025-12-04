// src/pages/dashboard/DashboardPage.jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '../../hooks/useAuth'
import { ArrowUpRight, Users, TrendingUp, DollarSign, Activity, ChevronRight } from 'lucide-react'

const DashboardPage = () => {
  const { user } = useAuth()

  const stats = [
    { title: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: DollarSign, color: 'text-primary' },
    { title: 'Active Users', value: '2,350', change: '+15.3%', icon: Users, color: 'text-green-600' },
    { title: 'New Sales', value: '1,324', change: '+8.2%', icon: TrendingUp, color: 'text-blue-600' },
    { title: 'Efficiency', value: '89.4%', change: '-3.1%', icon: Activity, color: 'text-red-600' },
  ]

  const recentActivity = [
    { id: 1, description: 'New user registration from Germany', time: '1 hour ago', type: 'user' },
    { id: 2, description: 'Order #9876 confirmed for $120.00', time: '3 hours ago', type: 'sale' },
    { id: 3, description: 'Server maintenance scheduled', time: 'Yesterday', type: 'system' },
    { id: 4, description: 'Login attempt failed from IP 192.168.1.1', time: '2 days ago', type: 'alert' },
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return <Users className="w-5 h-5 text-green-500" />
      case 'sale': return <DollarSign className="w-5 h-5 text-primary" />
      case 'system': return <Activity className="w-5 h-5 text-blue-500" />
      case 'alert': return <TrendingUp className="w-5 h-5 text-red-500" />
      default: return <Activity className="w-5 h-5 text-gray-500" />
    }
  }

  const getChangeStyle = (change) => {
    const isPositive = parseFloat(change) >= 0
    return {
      textClass: isPositive ? 'text-green-600' : 'text-red-600',
      icon: isPositive ? ArrowUpRight : TrendingUp,
    }
  }

  return (
    <>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard <span className="text-primary">Hello</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, <strong>{user?.name || 'Guest'}</strong>! Here's what's happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => {
          const { textClass, icon: ChangeIcon } = getChangeStyle(stat.change)
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-9 h-9 ${stat.color} opacity-80`} />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className={textClass}>
                    <ChangeIcon className="w-4 h-4 inline mr-1" />
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground ml-2">vs last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Project Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-muted-foreground">
              Chart goes here
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default DashboardPage