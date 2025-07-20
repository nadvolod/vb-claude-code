import Link from 'next/link'
import { Navigation } from '@/components/navigation'

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Navigation />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Achievements</h2>
          <div className="text-lg text-indigo-600 font-semibold">
            0 Goals Achieved
          </div>
        </div>

        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Achievements Yet
            </h3>
            <p className="text-gray-600 mb-8">
              Complete goals on your vision board to start earning achievements and tracking your progress.
            </p>
            <Link href="/app" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-lg">
              Go to Vision Board
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}