import {
  TrendingUp,
  Wallet,
  ArrowLeftRight,
  BarChart3,
  CircleHelp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

const menuItems = [
  { icon: TrendingUp, label: "Markets", path: "/dashboard/markets" },
  { icon: Wallet, label: "Portfolio", path: "/dashboard/portfolio" },
  {
    icon: ArrowLeftRight,
    label: "Transactions",
    path: "/dashboard/transactions",
  },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: CircleHelp, label: "Help", path: "/dashboard/help" },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="mt-16" variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link href={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarTrigger className="mt-8" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
