"use client"

import { navigation } from "@/data/navigation"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useNavigation } from "@/hooks/use-navigation"
import { getIcon } from "@/utils/icons"
import { memo } from "react"

export const AppSidebar = memo(function AppSidebar() {
  const pathname = usePathname()
  const { navigate, isRouteLoading } = useNavigation()

  const handleNavigation = (href: string) => {
    navigate(href)
  }

  return (
    <Card className="w-64 h-full flex flex-col shadow-lg border-r bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              CMMS
            </h2>
            <Badge
              variant="outline"
              className="animate-pulse bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-300"
            >
              v1.0
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Maintenance Management</p>
        </div>
      </div>

      {/* Navigation */}
      <CardContent className="flex-1 p-2 overflow-y-auto custom-scrollbar">
        <div className="space-y-1">
          <div className="px-2 py-1">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Navigation</h3>
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const isLoading = isRouteLoading(item.href)
            const IconComponent = getIcon(item.iconName)

            return (
              <Button
                key={item.name}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-10 transition-all duration-200 group relative overflow-hidden",
                  isActive && "bg-primary/10 text-primary border-primary/20 shadow-sm",
                  !isActive && "hover:bg-accent hover:text-accent-foreground hover:translate-x-1",
                  isLoading && "opacity-70",
                )}
                onClick={() => handleNavigation(item.href)}
                disabled={isLoading}
              >
                <div className="flex items-center space-x-3 relative z-10">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <IconComponent
                      className={cn(
                        "h-4 w-4 transition-all duration-200",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                        "group-hover:scale-110",
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      "font-medium transition-colors duration-200",
                      isActive ? "text-primary" : "text-foreground",
                    )}
                  >
                    {item.name}
                  </span>
                </div>

                {/* Active indicator */}
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />}

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Button>
            )
          })}
        </div>
      </CardContent>

      {/* Footer */}
      <div className="p-4 border-t bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8 ring-2 ring-primary/20">
              <AvatarImage src="/placeholder.svg?height=32&width=32&query=user" alt="User" />
              <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
              <Bell className="h-4 w-4" />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </Card>
  )
})
