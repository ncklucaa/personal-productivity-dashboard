"use client"

import { DashboardLayout } from '@/components/DashboardLayout'
import StatCard from '@/components/ui/StatCard'
import CommitChart from '@/components/charts/CommitChart'

export function DashboardContent({ githubData }) {
  const totalCommits = githubData.reduce((sum, day) => sum + day.commits, 0)
  const avgCommitsPerDay = githubData.length > 0 ? (totalCommits / githubData.length).toFixed(1) : 0

  return (
    <DashboardLayout>
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-2">My Productivity Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Track your coding patterns with data-driven insights</p>

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
              <StatCard label="Total Commits (90d)" value={totalCommits} />
              <StatCard label="Avg Commits/Day" value={avgCommitsPerDay} />
              <StatCard label="Active Days" value={githubData.length} />
            </div>

            {/* Commit Trend Chart */}
            <CommitChart data={githubData} />
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
