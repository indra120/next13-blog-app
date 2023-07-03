import { Roboto } from 'next/font/google'
import { Header, SessionProvider } from '@components'
import type { Layout } from '@types'
import './global.css'

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
    <body className={roboto.className}>
      <SessionProvider>
        <Header />
        {children}
      </SessionProvider>
    </body>
  </html>
)

export default RootLayout
