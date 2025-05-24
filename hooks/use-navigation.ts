"use client"

import { useRouter, usePathname } from "next/navigation"
import { useTransition, useCallback } from "react"
import { useNavigationStore } from "@/stores/navigation-store"

export function useNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const { currentPath, isLoading, loadingRoute, setCurrentPath, setLoading, setLoadingRoute, navigateWithLoading } =
    useNavigationStore()

  const navigate = useCallback(
    (href: string, options?: { replace?: boolean }) => {
      if (href === pathname) return

      navigateWithLoading(href)

      startTransition(() => {
        if (options?.replace) {
          router.replace(href)
        } else {
          router.push(href)
        }

        setTimeout(() => {
          setCurrentPath(href)
          setLoadingRoute(null)
          setLoading(false)
        }, 300)
      })
    },
    [pathname, router, navigateWithLoading, setCurrentPath, setLoadingRoute, setLoading],
  )

  const isRouteLoading = useCallback(
    (route: string) => {
      return loadingRoute === route || (isPending && currentPath !== route)
    },
    [loadingRoute, isPending, currentPath],
  )

  return {
    navigate,
    currentPath: pathname,
    isLoading: isPending || isLoading,
    isRouteLoading,
    loadingRoute,
  }
}
