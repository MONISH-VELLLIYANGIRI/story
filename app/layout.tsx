import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Story Plot Generator - Premium Story Creation",
  description: "Generate unique, creative stories with AI. Explore fantasy, sci-fi, romance and more.",
  

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
