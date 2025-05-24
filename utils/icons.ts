import {
  Package,
  Wrench,
  Building2,
  Users,
  Cog,
  Home,
  MapPin,
  Archive,
  BarChart3,
  Settings,
  UserCog,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Package,
  Wrench,
  Building2,
  Users,
  Cog,
  Home,
  MapPin,
  Archive,
  BarChart3,
  Settings,
  UserCog,
}

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Package // fallback to Package icon
}
