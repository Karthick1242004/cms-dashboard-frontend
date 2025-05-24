import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import type { User, AuthState } from "@/types/auth"

// Hardcoded users
const USERS: User[] = [
  {
    id: 1,
    email: "admin@company.com",
    password: "admin123",
    name: "John Doe",
    role: "admin",
    department: "IT",
    avatar: "/placeholder.svg?height=32&width=32&query=admin",
  },
  {
    id: 2,
    email: "manager@company.com",
    password: "manager123",
    name: "Sarah Johnson",
    role: "manager",
    department: "Maintenance",
    avatar: "/placeholder.svg?height=32&width=32&query=manager",
  },
  {
    id: 3,
    email: "tech@company.com",
    password: "tech123",
    name: "Mike Wilson",
    role: "technician",
    department: "HVAC",
    avatar: "/placeholder.svg?height=32&width=32&query=technician",
  },
]

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      immer((set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        login: async (email: string, password: string) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const user = USERS.find((u) => u.email === email && u.password === password)

            if (user) {
              set((state) => {
                state.user = user
                state.isAuthenticated = true
                state.isLoading = false
              })
              return true
            } else {
              set((state) => {
                state.error = "Invalid email or password"
                state.isLoading = false
              })
              return false
            }
          } catch (error) {
            set((state) => {
              state.error = "Login failed. Please try again."
              state.isLoading = false
            })
            return false
          }
        },

        logout: () =>
          set((state) => {
            state.user = null
            state.isAuthenticated = false
            state.error = null
          }),

        setLoading: (loading) =>
          set((state) => {
            state.isLoading = loading
          }),

        clearError: () =>
          set((state) => {
            state.error = null
          }),
      })),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    { name: "auth-store" },
  ),
)
