export default function StatCard({ label, value, trend }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold">{value}</p>
        {trend && (
          <span className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  )
}
