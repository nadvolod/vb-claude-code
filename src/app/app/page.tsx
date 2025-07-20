'use client'

import { Navigation } from '@/components/navigation'
import { AddGoalDialog } from '@/components/goal/add-goal-dialog'
import { GoalCard } from '@/components/goal/goal-card'
import { useGoals } from '@/hooks/use-goals'

export default function VisionBoardPage() {
  const { goals, loading, error } = useGoals()

  const activeGoals = goals.filter(goal => !goal.achieved)
  const completedGoals = goals.filter(goal => goal.achieved)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <Navigation />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <Navigation />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Navigation />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {goals.length === 0 ? (
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
              <AddGoalDialog>
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-lg">
                  Add Your First Goal
                </button>
              </AddGoalDialog>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Your Vision Board</h1>
                <p className="text-gray-600 mt-1">
                  {activeGoals.length} active goals • {completedGoals.length} completed
                </p>
              </div>
              <AddGoalDialog>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Goal
                </button>
              </AddGoalDialog>
            </div>

            {activeGoals.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeGoals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                  ))}
                </div>
              </div>
            )}

            {completedGoals.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedGoals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}