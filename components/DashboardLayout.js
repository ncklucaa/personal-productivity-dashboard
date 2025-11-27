"use client"

import React from "react"
import Link from "next/link"
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar-new"
import {
  LayoutDashboard,
  GitBranch,
  Music,
  Calendar,
  Settings,
} from "lucide-react"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Github",
    url: "/dashboard/github",
    icon: GitBranch,
  },
  {
    title: "Spotify",
    url: "/dashboard/spotify",
    icon: Music,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link href={item.url} className="text-white flex items-center gap-2">
                        <item.icon className="text-white" />
                        <span className="text-white">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <main className="flex-1 min-h-screen bg-[#0a0a0a]">
        <div className="px-4 py-2">
          <SidebarTrigger className="text-white hover:bg-[#2a2a2a] border border-[#2a2a2a]" />
        </div>
        <div className="px-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

