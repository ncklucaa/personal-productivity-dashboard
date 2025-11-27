export default function StatCard({ label, value, trend }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-md p-6">
      <p className="text-sm text-neutral-400 mb-1">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-white">{value}</p>
        {trend && (
          <span className={`text-sm ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  )
}
