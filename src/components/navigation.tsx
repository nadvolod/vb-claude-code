'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'

export function Navigation() {
  const { user, signOut } = useAuth()

  return (
    <nav className="flex justify-between items-center">
      <Link href={user ? "/app" : "/"}>
        <h1 className="text-2xl font-bold text-indigo-600">Vision Board Bliss</h1>
      </Link>
      
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link href="/app" className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Vision Board
            </Link>
            <Link href="/achievements" className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Achievements
            </Link>
            <button
              onClick={signOut}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth" className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">
              Sign In
            </Link>
            <Link href="/auth" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}