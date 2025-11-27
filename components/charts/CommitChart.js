"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartConfig = {
  commits: {
    label: "Commits",
    color: "#3b82f6", // Explicit blue color
  },
}

export default function CommitChart({ data = [] }) {
  const [timeRange, setTimeRange] = React.useState("90d")

  // Get the most recent date from the data
  const getMostRecentDate = () => {
    if (data.length === 0) return new Date()
    const dates = data.map(item => new Date(item.date))
    return new Date(Math.max(...dates))
  }

  const filteredData = React.useMemo(() => {
    if (data.length === 0) return []

    const referenceDate = getMostRecentDate()
    let daysToSubtract = 90

    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return data
      .filter((item) => {
        const date = new Date(item.date)
        return date >= startDate && date <= referenceDate
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [data, timeRange])

  const totalCommits = React.useMemo(() => {
    return filteredData.reduce((sum, item) => sum + (item.commits || 0), 0)
  }, [filteredData])

  const avgCommitsPerDay = React.useMemo(() => {
    if (filteredData.length === 0) return 0
    return (totalCommits / filteredData.length).toFixed(1)
  }, [totalCommits, filteredData.length])

  return (
    <Card className="pt-0 border-none shadow-none bg-transparent">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b border-[#2a2a2a] py-5 sm:flex-row px-0">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xl text-white">Commit Activity</CardTitle>
          <CardDescription className="text-neutral-400">
            {filteredData.length > 0
              ? `${totalCommits} total commits • ${avgCommitsPerDay} per day average`
              : "No commit data available"}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a time range"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-0 pt-4 sm:pt-6">
        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-[250px] text-neutral-400">
            No data available for the selected time range
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillCommits" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#3b82f6"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="#3b82f6"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#2a2a2a" strokeOpacity={0.5} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                stroke="#a3a3a3"
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="#a3a3a3"
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="commits"
                type="monotone"
                fill="url(#fillCommits)"
                stroke="#3b82f6"
                strokeWidth={3}
                stackId="a"
                animationDuration={1500}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
