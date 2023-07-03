import { Layout } from '@types'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

export const metadata = {
  title: 'Blog App',
  description: 'A simple blog app built with Next13',
}

const RootLayout: Layout = ({ children }) => (
  <html lang="en">
    <body className={roboto.className}>{children}</body>
  </html>
)

export default RootLayout
