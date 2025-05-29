import { defineStore } from 'pinia'

interface Todo {
  id: number
  text: string
  completed: boolean
  smart?: boolean
}

interface TodoLevel {
  level1: Todo[]
  level2: Todo[]
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[][],
    sampleTodos: {
      "ダイエットする": {
        level1: [
          { id: 1, text: "食事管理を行う", completed: false },
          { id: 2, text: "運動習慣を身につける", completed: false },
          { id: 3, text: "生活習慣を改善する", completed: false }
        ],
        level2: [
          { id: 4, text: "1日の糖質摂取量を20g以下にする", completed: false, smart: true },
          { id: 5, text: "毎日の摂取カロリーを1500kcal以下に制限する", completed: false, smart: true },
          { id: 6, text: "スクワット10回×3セットを毎日行う", completed: false, smart: true },
          { id: 7, text: "週3回、30分間のウォーキングをする", completed: false, smart: true },
          { id: 8, text: "毎日23時までに就寝する", completed: false, smart: true },
          { id: 9, text: "1日8杯以上の水を飲む", completed: false, smart: true }
        ]
      }
    } as Record<string, TodoLevel>
  }),
  actions: {
    generateTodos(goal: string) {
      const selectedTodos = this.sampleTodos[goal] || this.sampleTodos["ダイエットする"]
      this.todos = [selectedTodos.level1, selectedTodos.level2]
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