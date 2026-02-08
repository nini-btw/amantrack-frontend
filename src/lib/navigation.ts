import {
  LayoutDashboard,
  Package,
  MapPin,
  BarChart,
  FileText,
} from "lucide-react";

export const navigation = [
  {
    label: "Main",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Statistics", href: "/statistics", icon: BarChart },
    ],
  },
  {
    label: "Management",
    items: [
      { name: "Assets", href: "/assets", icon: Package },
      { name: "Locations", href: "/locations", icon: MapPin },
    ],
  },
  {
    label: "System",
    items: [{ name: "Reports", href: "/reports", icon: FileText }],
  },
];
