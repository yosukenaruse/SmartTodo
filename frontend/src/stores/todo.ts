import { defineStore } from 'pinia'

interface Todo {
  id: number
  text: string
  completed: boolean
  smart?: boolean
}

interface Subtask extends Todo {
  smart: boolean
}

interface BreakdownItem {
  id: number
  text: string
  completed: boolean
  subtasks: Subtask[]
}

interface TodoResponse {
  goal: string
  breakdown: BreakdownItem[]
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[][],
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
        
        // APIレスポンスの形式に合わせてデータを変換
        const level1 = data.breakdown.map(item => ({
          id: item.id,
          text: item.text,
          completed: item.completed
        }))
        
        const level2 = data.breakdown.flatMap(item => 
          item.subtasks.map(subtask => ({
            id: subtask.id,
            text: subtask.text,
            completed: subtask.completed,
            smart: subtask.smart
          }))
        )
        
        this.todos = [level1, level2]
      } catch (error) {
        console.error('Failed to fetch todos:', error)
        // エラー時のフォールバック
        this.todos = []
      } finally {
        this.isLoading = false
      }
    },
    toggleTodo(levelIndex: number, todoIndex: number) {
      this.todos[levelIndex][todoIndex].completed = !this.todos[levelIndex][todoIndex].completed
    }
  },
  getters: {
    completedCount: (state) => {
      return state.todos.flat().filter(todo => todo.completed).length
    },
    totalCount: (state) => {
      return state.todos.flat().length
    },
    progressPercentage: (state) => {
      const total = state.todos.flat().length
      if (total === 0) return 0
      return Math.round((state.todos.flat().filter(todo => todo.completed).length / total) * 100)
    }
  }
}) 