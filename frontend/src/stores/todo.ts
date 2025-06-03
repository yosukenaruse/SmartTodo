import { defineStore } from 'pinia'

interface Todo {
  id: number
  text: string
  completed: boolean
  smart?: boolean
  reason?: string
}

interface Subtask extends Todo {
  smart: boolean
}

interface BreakdownItem {
  id: number
  text: string
  completed: boolean
  reason?: string
  subtasks: Subtask[]
}

interface TodoResponse {
  goal: string
  breakdown: BreakdownItem[]
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as BreakdownItem[],
    currentGoal: '',
    isLoading: false
  }),
  actions: {
    async generateTodos(goal: string) {
      this.isLoading = true
      try {
        const response = await fetch('http://localhost:3000/api/todos/breakdown', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ goal })
        })
        
        if (!response.ok) {
          throw new Error('API request failed')
        }

        const data: TodoResponse = await response.json()
        this.currentGoal = data.goal
        
        // breakdownをそのまま格納
        this.todos = data.breakdown
      } catch (error) {
        console.error('Failed to fetch todos:', error)
        // エラー時のフォールバック
        this.todos = []
      } finally {
        this.isLoading = false
      }
    }
  },
  getters: {
    completedCount: (state) => {
      return state.todos.reduce((sum, b) => sum + b.subtasks.filter(t => t.completed).length, 0)
    },
    totalCount: (state) => {
      return state.todos.reduce((sum, b) => sum + b.subtasks.length, 0)
    },
    progressPercentage: (state) => {
      const total = state.todos.reduce((sum, b) => sum + b.subtasks.length, 0)
      if (total === 0) return 0
      const completed = state.todos.reduce((sum, b) => sum + b.subtasks.filter(t => t.completed).length, 0)
      return Math.round((completed / total) * 100)
    }
  }
}) 