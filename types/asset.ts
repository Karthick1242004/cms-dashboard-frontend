export interface Asset {
  id: number
  name: string
  assetTag: string
  type: string
  location: string
  status: "operational" | "maintenance" | "out-of-service"
  purchaseDate: string
  purchasePrice: number
  condition: "excellent" | "good" | "fair" | "poor"
}

export interface AssetsState {
  assets: Asset[]
  filteredAssets: Asset[]
  searchTerm: string
  statusFilter: string
  conditionFilter: string
  isLoading: boolean
  isDialogOpen: boolean
  selectedAsset: Asset | null

  // Actions
  setAssets: (assets: Asset[]) => void
  addAsset: (asset: Omit<Asset, "id">) => void
  updateAsset: (id: number, updates: Partial<Asset>) => void
  deleteAsset: (id: number) => void
  setSearchTerm: (term: string) => void
  setStatusFilter: (status: string) => void
  setConditionFilter: (condition: string) => void
  setLoading: (loading: boolean) => void
  setDialogOpen: (open: boolean) => void
  setSelectedAsset: (asset: Asset | null) => void
  filterAssets: () => void
  fetchAssets: () => Promise<void>
}
