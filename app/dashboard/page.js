import { supabase } from '@/lib/supabase'
import Card from '@/components/ui/Card'
import StatCard from '@/components/ui/StatCard'
import CommitChart from '@/components/charts/CommitChart'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar-new"
import { LayoutDashboard, Github, Music, Calendar, Settings, User } from 'lucide-react'

async function getGitHubData() {
  const { data, error } = await supabase
    .from('github_activity')
    .select('*')
    .order('date', { ascending: false })
    .limit(30)

  if (error) {
    console.error('Error fetching GitHub data:', error)
    return []
  }

  return data || []
}

export default async function Dashboard() {
  const githubData = await getGitHubData()
  const totalCommits = githubData.reduce((sum, day) => sum + day.commits, 0)
  const avgCommitsPerDay = githubData.length > 0 ? (totalCommits / githubData.length).toFixed(1) : 0

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-neutral-800">
        <SidebarHeader className="border-b border-neutral-800 p-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-white" />
            <span className="font-semibold text-white">Dashboard</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/github">
                      <Github className="w-4 h-4" />
                      <span>Github</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/spotify">
                      <Music className="w-4 h-4" />
                      <span>Spotify</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/calendar">
                      <Calendar className="w-4 h-4" />
                      <span>Calendar</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/settings">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-neutral-800 p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-neutral-400">N</span>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <div className="min-h-screen bg-black p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-semibold text-white mb-2">
              My Productivity Dashboard
            </h1>
            <p className="text-neutral-500 mb-8">
              Track your coding patterns with data-driven insights
            </p>

            {githubData.length === 0 ? (
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <p className="text-neutral-400">
                  No data yet! Visit{' '}
                  <a href="/api/github" className="underline font-semibold text-white">
                    /api/github
                  </a>{' '}
                  to collect your first batch of data.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <StatCard label="Total Commits (30d)" value={totalCommits} />
                  <StatCard label="Avg Commits/Day" value={avgCommitsPerDay} />
                  <StatCard label="Active Days" value={githubData.length} />
                </div>

                <Card title="Commit Activity (Last 30 Days)">
                  <CommitChart data={[...githubData].reverse()} />
                </Card>
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
