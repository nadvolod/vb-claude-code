'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/auth'
import { useAuth } from '@/contexts/auth-context'
import { Goal } from '@/types'

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  const fetchGoals = async () => {
    if (!user) {
      setGoals([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      setGoals(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch goals')
    } finally {
      setLoading(false)
    }
  }

  const addGoal = async (goalData: Omit<Goal, 'id' | 'user_id' | 'createdAt' | 'achieved' | 'achievedAt'>) => {
    if (!user) throw new Error('User not authenticated')

    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([
          {
            ...goalData,
            user_id: user.id,
            created_at: new Date().toISOString(),
            achieved: false
          }
        ])
        .select()
        .single()

      if (error) throw error

      setGoals(prev => [data, ...prev])
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add goal')
    }
  }

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    if (!user) throw new Error('User not authenticated')

    try {
      const { data, error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error

      setGoals(prev => prev.map(goal => goal.id === id ? data : goal))
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update goal')
    }
  }

  const deleteGoal = async (id: string) => {
    if (!user) throw new Error('User not authenticated')

    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error

      setGoals(prev => prev.filter(goal => goal.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete goal')
    }
  }

  const toggleGoalAchieved = async (id: string) => {
    const goal = goals.find(g => g.id === id)
    if (!goal) return

    const updates = {
      achieved: !goal.achieved,
      achievedAt: !goal.achieved ? new Date().toISOString() : null
    }

    return updateGoal(id, updates)
  }

  useEffect(() => {
    fetchGoals()
  }, [user])

  return {
    goals,
    loading,
    error,
    addGoal,
    updateGoal,
    deleteGoal,
    toggleGoalAchieved,
    refetch: fetchGoals
  }
}