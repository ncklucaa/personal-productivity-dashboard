import './globals.css'

export const metadata = {
  title: 'My Productivity Dashboard',
  description: 'Track your coding patterns with ML-powered insights',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
