import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { fetchGitHubActivity } from '@/lib/github'

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME || 'YOUR_GITHUB_USERNAME'
    const token = process.env.GITHUB_TOKEN

    if (!token) {
      throw new Error('GITHUB_TOKEN not configured')
    }

    const activities = await fetchGitHubActivity(username, token)

    // Store in Supabase
    for (const activity of activities) {
      const { error } = await supabase
        .from('github_activity')
        .upsert(activity, { onConflict: 'date' })

      if (error) throw error
    }

    return NextResponse.json({
      success: true,
      message: `Collected ${activities.length} days of GitHub activity`,
      data: activities
    })
  } catch (error) {
    console.error('GitHub API error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
