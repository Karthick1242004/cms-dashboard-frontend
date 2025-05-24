"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useDashboardStore } from "@/stores/dashboard-store"
import { useNavigation } from "@/hooks/use-navigation"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { getIcon } from "@/utils/icons"

export default function Dashboard() {
  const { navigate } = useNavigation()
  const {
    stats: storeStats,
    recentActivities: storeActivities,
    quickActions: storeActions,
    isLoading,
    initializeData,
    refreshDashboard,
  } = useDashboardStore()

  useEffect(() => {
    // Initialize data if not already loaded
    initializeData()
  }, [initializeData])

  const handleQuickAction = (href: string) => {
    navigate(href)
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-2"></div>
          <div className="h-4 bg-muted rounded w-96"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-8 bg-muted rounded w-8"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-16 mb-2"></div>
                <div className="h-3 bg-muted rounded w-32"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          CMMS Dashboard
        </h1>
        <p className="text-muted-foreground">Comprehensive maintenance management system overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {storeStats.map((stat, index) => {
          const IconComponent = getIcon(stat.iconName)
          return (
            <Card
              key={stat.title}
              className={cn(
                "overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 border-l-4 border-l-transparent hover:border-l-primary bg-gradient-to-br from-card to-card/50",
                "animate-fade-in",
                { "animate-delay-100": index === 1 },
                { "animate-delay-200": index === 2 },
                { "animate-delay-300": index === 3 },
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center transition-transform hover:scale-110">
                  <IconComponent className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      stat.change.startsWith("+")
                        ? "text-green-600 font-medium"
                        : stat.change.startsWith("-")
                          ? "text-red-600 font-medium"
                          : "text-gray-600"
                    }
                  >
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card className="animate-fade-in animate-delay-400 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              Recent Activities
            </CardTitle>
            <CardDescription>Latest updates across your maintenance operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storeActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={cn(
                    "flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-muted/50 hover:scale-[1.02] border border-transparent hover:border-border/50",
                    "animate-fade-in",
                    { "animate-delay-100": index === 1 },
                    { "animate-delay-200": index === 2 },
                  )}
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge
                    variant={
                      activity.status === "completed"
                        ? "default"
                        : activity.status === "pending"
                          ? "destructive"
                          : "secondary"
                    }
                    className="transition-all duration-300 hover:scale-105"
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="animate-fade-in animate-delay-500 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {storeActions.map((action, index) => {
                const IconComponent = getIcon(action.iconName)
                return (
                  <button
                    key={action.title}
                    onClick={() => handleQuickAction(action.href)}
                    className={cn(
                      "flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] group bg-gradient-to-r from-background to-background/50 hover:from-primary/5 hover:to-primary/10 text-left",
                      "animate-fade-in",
                      { "animate-delay-100": index === 1 },
                      { "animate-delay-200": index === 2 },
                      { "animate-delay-300": index === 3 },
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <IconComponent className={`h-5 w-5 ${action.color}`} />
                      </div>
                      <span className="font-medium">{action.title}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
