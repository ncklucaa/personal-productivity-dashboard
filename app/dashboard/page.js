import { supabase } from '@/lib/supabase'
import Card from '@/components/ui/Card'
import StatCard from '@/components/ui/StatCard'
import CommitChart from '@/components/charts/CommitChart'

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">My Productivity Dashboard</h1>
        <p className="text-gray-600 mb-8">Track your coding patterns with data-driven insights</p>

        {githubData.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-yellow-800">
              No data yet! Visit{' '}
              <a href="/api/github" className="underline font-semibold">
                /api/github
              </a>{' '}
              to collect your first batch of data.
            </p>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard label="Total Commits (30d)" value={totalCommits} />
              <StatCard label="Avg Commits/Day" value={avgCommitsPerDay} />
              <StatCard label="Active Days" value={githubData.length} />
            </div>

            {/* Commit Trend Chart */}
            <Card title="Commit Activity (Last 30 Days)" className="mb-8">
              <CommitChart data={[...githubData].reverse()} />
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
