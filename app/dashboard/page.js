import { supabase } from '@/lib/supabase'
import { DashboardContent } from '@/components/DashboardContent'

async function getGitHubData() {
  const { data, error } = await supabase
    .from('github_activity')
    .select('*')
    .order('date', { ascending: false })
    .limit(90) // Increased to support 90-day filter

  if (error) {
    console.error('Error fetching GitHub data:', error)
    return []
  }

  return data || []
}

export default async function Dashboard() {
  const githubData = await getGitHubData()

  return <DashboardContent githubData={githubData} />
}
