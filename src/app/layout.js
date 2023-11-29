import { Inter } from 'next/font/google'
import './globals.css'
import NextAuthProvider from './lib/sessionProvider'
import Header from './components/header'
import Footer from './components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Utility Tool',
  description: 'A utility calculator that helps landlords calculate tenant utility costs.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header/>
          {children}
          <Footer/>
        </NextAuthProvider>
      </body>
    </html>
  )
}
