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
import { Plus, Search, Edit, Trash2, Package, AlertTriangle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const parts = [
  {
    id: 1,
    partNumber: "FILT-001",
    name: "HVAC Air Filter",
    description: "High-efficiency air filter for HVAC systems",
    category: "Filters",
    linkedAssets: ["HVAC-001", "AH-002"],
    stockQuantity: 25,
    minStockLevel: 10,
    unitPrice: 45.99,
    supplier: "FilterCorp Inc.",
  },
  {
    id: 2,
    partNumber: "BELT-002",
    name: "Drive Belt",
    description: "Replacement drive belt for generators",
    category: "Belts",
    linkedAssets: ["GEN-003"],
    stockQuantity: 5,
    minStockLevel: 8,
    unitPrice: 89.5,
    supplier: "Industrial Parts Co.",
  },
  {
    id: 3,
    partNumber: "PUMP-003",
    name: "Water Pump",
    description: "Centrifugal water pump for cooling systems",
    category: "Pumps",
    linkedAssets: ["HVAC-001"],
    stockQuantity: 12,
    minStockLevel: 5,
    unitPrice: 245.0,
    supplier: "Pump Solutions Ltd.",
  },
  {
    id: 4,
    partNumber: "WIRE-004",
    name: "Electrical Wire",
    description: "14 AWG electrical wire for general use",
    category: "Electrical",
    linkedAssets: ["ELEV-001", "GEN-003"],
    stockQuantity: 2,
    minStockLevel: 10,
    unitPrice: 12.75,
    supplier: "ElectroSupply Co.",
  },
]

export default function PartsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredParts = parts.filter(
    (part) =>
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStockStatus = (current: number, minimum: number) => {
    if (current <= minimum) return "low"
    if (current <= minimum * 1.5) return "warning"
    return "good"
  }

  const getStockBadgeVariant = (status: string) => {
    switch (status) {
      case "low":
        return "destructive"
      case "warning":
        return "secondary"
      case "good":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parts Inventory</h1>
          <p className="text-muted-foreground">Manage spare parts and components linked to your assets</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Part
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Part</DialogTitle>
              <DialogDescription>Add a new part to your inventory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="partNumber" className="text-right">
                  Part Number
                </Label>
                <Input id="partNumber" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="filters">Filters</SelectItem>
                    <SelectItem value="belts">Belts</SelectItem>
                    <SelectItem value="pumps">Pumps</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="mechanical">Mechanical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stockQuantity" className="text-right">
                  Stock Qty
                </Label>
                <Input id="stockQuantity" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="minStockLevel" className="text-right">
                  Min Stock
                </Label>
                <Input id="minStockLevel" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unitPrice" className="text-right">
                  Unit Price
                </Label>
                <Input id="unitPrice" type="number" step="0.01" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                Save Part
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search parts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Part Details</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Linked Assets</TableHead>
              <TableHead>Stock Status</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParts.map((part) => {
              const stockStatus = getStockStatus(part.stockQuantity, part.minStockLevel)
              return (
                <TableRow key={part.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{part.name}</div>
                      <div className="text-sm text-muted-foreground">{part.partNumber}</div>
                      <div className="text-xs text-muted-foreground">{part.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{part.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {part.linkedAssets.map((asset, index) => (
                        <Badge key={index} variant="secondary" className="mr-1 text-xs">
                          {asset}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4" />
                        <span className="text-sm">{part.stockQuantity}</span>
                        {stockStatus === "low" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      </div>
                      <Badge variant={getStockBadgeVariant(stockStatus)} className="text-xs">
                        {stockStatus === "low" ? "Low Stock" : stockStatus === "warning" ? "Warning" : "Good"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>${part.unitPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-sm">{part.supplier}</TableCell>
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
                        <DropdownMenuItem>
                          <Package className="mr-2 h-4 w-4" />
                          Adjust Stock
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
