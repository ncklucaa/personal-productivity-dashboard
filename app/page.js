import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Productivity Dashboard</h1>
        <p className="text-xl text-gray-700 mb-8">Track your coding patterns with ML-powered insights</p>
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          View Dashboard
        </Link>
      </div>
    </div>
  )
}
