import './globals.css'

export const metadata = {
  title: 'Me_canon_wala — Portfolio',
  description: 'Photographer & Videographer Portfolio'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
