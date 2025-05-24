"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Calendar, DollarSign } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageLayout, PageHeader, PageContent } from "@/components/page-layout"

const assets = [
  {
    id: 1,
    name: "HVAC Unit #1",
    assetTag: "HVAC-001",
    type: "HVAC System",
    location: "Building A - Floor 1",
    status: "operational",
    purchaseDate: "2022-01-15",
    purchasePrice: 15000,
    condition: "good",
  },
  {
    id: 2,
    name: "Generator #3",
    assetTag: "GEN-003",
    type: "Power Generation",
    location: "Building B - Basement",
    status: "maintenance",
    purchaseDate: "2021-06-20",
    purchasePrice: 25000,
    condition: "fair",
  },
  {
    id: 3,
    name: "Air Handler #2",
    assetTag: "AH-002",
    type: "HVAC System",
    location: "Building A - Floor 2",
    status: "operational",
    purchaseDate: "2023-03-10",
    purchasePrice: 8000,
    condition: "excellent",
  },
  {
    id: 4,
    name: "Elevator #1",
    assetTag: "ELEV-001",
    type: "Transportation",
    location: "Building A - Main",
    status: "out-of-service",
    purchaseDate: "2020-11-05",
    purchasePrice: 45000,
    condition: "poor",
  },
  // Add more assets for scrolling demonstration
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 5,
    name: `Asset #${i + 5}`,
    assetTag: `AST-${String(i + 5).padStart(3, "0")}`,
    type: "Equipment",
    location: `Building ${String.fromCharCode(65 + (i % 3))} - Floor ${(i % 5) + 1}`,
    status: ["operational", "maintenance", "out-of-service"][i % 3] as const,
    purchaseDate: `202${(i % 4) + 1}-${String((i % 12) + 1).padStart(2, "0")}-15`,
    purchasePrice: Math.floor(Math.random() * 50000) + 5000,
    condition: ["excellent", "good", "fair", "poor"][i % 4] as const,
  })),
]

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "default"
      case "maintenance":
        return "secondary"
      case "out-of-service":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "default"
      case "good":
        return "secondary"
      case "fair":
        return "outline"
      case "poor":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <PageLayout>
      <PageHeader>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
            <p className="text-muted-foreground">Manage your organization's physical assets and equipment</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
                <DialogDescription>Register a new asset in your inventory.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="assetTag" className="text-right">
                    Asset Tag
                  </Label>
                  <Input id="assetTag" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hvac">HVAC System</SelectItem>
                      <SelectItem value="electrical">Electrical Equipment</SelectItem>
                      <SelectItem value="plumbing">Plumbing System</SelectItem>
                      <SelectItem value="power">Power Generation</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="purchasePrice" className="text-right">
                    Purchase Price
                  </Label>
                  <Input id="purchasePrice" type="number" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                  Save Asset
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </PageHeader>

      <PageContent>
        <div className="border rounded-lg bg-background">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10 border-b">
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Purchase Info</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">{asset.assetTag}</div>
                    </div>
                  </TableCell>
                  <TableCell>{asset.type}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(asset.status)}>{asset.status.replace("-", " ")}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getConditionColor(asset.condition)}>{asset.condition}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <DollarSign className="mr-1 h-3 w-3" />${asset.purchasePrice.toLocaleString()}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {asset.purchaseDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PageContent>
    </PageLayout>
  )
}
