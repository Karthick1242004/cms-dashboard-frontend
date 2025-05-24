import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import type { Department, DepartmentsState } from "@/types/department"

export const useDepartmentsStore = create<DepartmentsState>()(
  devtools(
    persist(
      immer((set, get) => ({
        departments: [],
        filteredDepartments: [],
        searchTerm: "",
        isLoading: false,
        isDialogOpen: false,
        selectedDepartment: null,

        setDepartments: (departments) =>
          set((state) => {
            state.departments = departments
            state.filteredDepartments = departments
          }),

        addDepartment: (department) =>
          set((state) => {
            const newDepartment = {
              ...department,
              id: Math.max(...state.departments.map((d) => d.id), 0) + 1,
            }
            state.departments.push(newDepartment)
            state.filteredDepartments = state.departments.filter(
              (dept) =>
                dept.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                dept.description.toLowerCase().includes(state.searchTerm.toLowerCase()),
            )
          }),

        updateDepartment: (id, updates) =>
          set((state) => {
            const index = state.departments.findIndex((d) => d.id === id)
            if (index !== -1) {
              state.departments[index] = { ...state.departments[index], ...updates }
              get().filterDepartments()
            }
          }),

        deleteDepartment: (id) =>
          set((state) => {
            state.departments = state.departments.filter((d) => d.id !== id)
            get().filterDepartments()
          }),

        setSearchTerm: (term) =>
          set((state) => {
            state.searchTerm = term
            get().filterDepartments()
          }),

        setLoading: (loading) =>
          set((state) => {
            state.isLoading = loading
          }),

        setDialogOpen: (open) =>
          set((state) => {
            state.isDialogOpen = open
          }),

        setSelectedDepartment: (department) =>
          set((state) => {
            state.selectedDepartment = department
          }),

        filterDepartments: () =>
          set((state) => {
            const term = state.searchTerm.toLowerCase()
            state.filteredDepartments = state.departments.filter(
              (dept) => dept.name.toLowerCase().includes(term) || dept.description.toLowerCase().includes(term),
            )
          }),

        fetchDepartments: async () => {
          set((state) => {
            state.isLoading = true
          })

          try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 800))

            // Mock data - replace with actual API call
            const mockDepartments: Department[] = [
              {
                id: 1,
                name: "Maintenance",
                description: "General facility maintenance and repairs",
                manager: "John Smith",
                employeeCount: 12,
                status: "active",
              },
              {
                id: 2,
                name: "HVAC",
                description: "Heating, ventilation, and air conditioning",
                manager: "Sarah Johnson",
                employeeCount: 8,
                status: "active",
              },
              {
                id: 3,
                name: "Electrical",
                description: "Electrical systems and power management",
                manager: "Mike Wilson",
                employeeCount: 6,
                status: "active",
              },
              {
                id: 4,
                name: "Plumbing",
                description: "Water systems and plumbing maintenance",
                manager: "Lisa Brown",
                employeeCount: 4,
                status: "inactive",
              },
            ]

            set((state) => {
              state.departments = mockDepartments
              state.filteredDepartments = mockDepartments
              state.isLoading = false
            })
          } catch (error) {
            set((state) => {
              state.isLoading = false
            })
          }
        },
      })),
      {
        name: "departments-storage",
        partialize: (state) => ({
          departments: state.departments,
        }),
      },
    ),
    { name: "departments-store" },
  ),
)
