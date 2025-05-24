import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import type { NavigationState } from "@/types/navigation"

export const useNavigationStore = create<NavigationState>()(
  devtools(
    immer((set, get) => ({
      currentPath: "/",
      isLoading: false,
      loadingRoute: null,
      breadcrumbs: [],

      setCurrentPath: (path) =>
        set((state) => {
          state.currentPath = path
        }),

      setLoading: (loading) =>
        set((state) => {
          state.isLoading = loading
        }),

      setLoadingRoute: (route) =>
        set((state) => {
          state.loadingRoute = route
        }),

      setBreadcrumbs: (breadcrumbs) =>
        set((state) => {
          state.breadcrumbs = breadcrumbs
        }),

      navigateWithLoading: (route) =>
        set((state) => {
          state.loadingRoute = route
          state.isLoading = true
        }),
    })),
    { name: "navigation-store" },
  ),
)
