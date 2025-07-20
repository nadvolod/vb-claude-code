'use client'

import { useState } from 'react'
import { Goal } from '@/types'
import { useGoals } from '@/hooks/use-goals'

interface GoalCardProps {
  goal: Goal
}

export function GoalCard({ goal }: GoalCardProps) {
  const [imageError, setImageError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toggleGoalAchieved, deleteGoal } = useGoals()

  const handleToggleAchieved = async () => {
    setLoading(true)
    try {
      await toggleGoalAchieved(goal.id)
    } catch (error) {
      console.error('Failed to toggle goal:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this goal?')) return
    
    setLoading(true)
    try {
      await deleteGoal(goal.id)
    } catch (error) {
      console.error('Failed to delete goal:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isOverdue = !goal.achieved && new Date(goal.deadline) < new Date()

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${goal.achieved ? 'ring-2 ring-green-200' : ''}`}>
      <div className="relative">
        {!imageError ? (
          <img
            src={goal.image}
            alt={goal.description}
            className="w-full h-48 object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {goal.achieved && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {goal.description}
        </h3>
        
        {goal.why && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {goal.why}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>Deadline:</span>
          <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
            {formatDate(goal.deadline)}
          </span>
        </div>

        {goal.achieved && goal.achieved_at && (
          <div className="flex items-center justify-between text-sm text-green-600 mb-3">
            <span>Achieved:</span>
            <span>{formatDate(goal.achieved_at)}</span>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleToggleAchieved}
            disabled={loading}
            className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
              goal.achieved
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            } disabled:opacity-50`}
          >
            {goal.achieved ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-3 py-2 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}