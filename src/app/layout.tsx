import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Happy Phone',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className="bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Happy Phone
            </Link>
            <div className="flex gap-4">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Новая заявка
              </Link>
              <Link
                href="/orders"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Мои заявки
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
