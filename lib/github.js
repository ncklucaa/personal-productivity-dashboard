export async function fetchGitHubActivity(username, token) {
  // Fetch user's events (commits, PRs, issues)
  const eventsUrl = `https://api.github.com/users/${username}/events?per_page=100`

  const response = await fetch(eventsUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }

  const events = await response.json()

  // Process events to extract commits by day
  const commitsByDay = {}

  events.forEach((event) => {
    if (event.type === 'PushEvent') {
      const date = event.created_at.split('T')[0]
      const hour = new Date(event.created_at).getHours()

      if (!commitsByDay[date]) {
        commitsByDay[date] = {
          count: 0,
          repos: new Set(),
          languages: new Set(),
          hours: new Set(),
        }
      }

      commitsByDay[date].count += event.payload.commits?.length || 1
      commitsByDay[date].repos.add(event.repo.name)
      commitsByDay[date].hours.add(hour)
    }
  })

  // Convert to array format
  return Object.entries(commitsByDay).map(([date, data]) => ({
    date,
    commits: data.count,
    repos: Array.from(data.repos),
    languages: [],
    hours_active: Array.from(data.hours),
  }))
}
