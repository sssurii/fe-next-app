import { ReactNode } from "react";
import { Inter } from 'next/font/google'
import AuthProvider from "@/common/utils/authProvider";
import './globals.css'

const primaryFont = Inter({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-primaryFont',
});

export const metadata = {
  title: 'FnL Boilerplate',
  description: 'Generated by fl-web-boilerplate',
}

export default function RootLayout ({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${primaryFont.variable} font-primary`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
