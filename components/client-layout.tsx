"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Suspense } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ProtectedRoute } from "@/components/protected-route"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Fixed Header */}
        <div className="flex-shrink-0 p-2 pb-0">
          <Header />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 gap-2 p-2 pt-0 min-h-0">
          {/* Fixed Sidebar */}
          <div className="flex-shrink-0">
            <AppSidebar />
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <div className="flex-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg border shadow-sm overflow-hidden">
              <Suspense fallback={<LoadingSpinner />}>
                <div className="h-full overflow-y-auto custom-scrollbar">
                  <div className="p-6">{children}</div>
                </div>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
