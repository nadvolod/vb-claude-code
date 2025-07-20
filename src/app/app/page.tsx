import { Navigation } from '@/components/navigation'

export default function VisionBoardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Navigation />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Vision Board
            </h2>
            <p className="text-gray-600 mb-8">
              Add your first goal to begin creating your vision board. Upload an inspiring image and describe what you want to achieve.
            </p>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-lg">
              Add Your First Goal
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}