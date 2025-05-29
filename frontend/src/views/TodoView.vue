<template>
  <div class="container">
    <div class="header">
      <h1>SMART Todo</h1>
      <p>目標を入力すると、AIが達成可能なステップに分解します</p>
    </div>

    <div class="input-section">
      <div class="goal-input">
        <input 
          type="text" 
          v-model="goal" 
          @keypress.enter="generateTodos"
          placeholder="例: ダイエットする、英語を話せるようになる、副業を始める..." 
        />
        <button class="generate-btn" @click="generateTodos">
          <span>{{ isGenerating ? '分析中...' : '分解する' }}</span>
        </button>
      </div>
      <div class="status" :class="{ generating: isGenerating }">
        AIが目標を分析中...しばらくお待ちください
      </div>
    </div>

    <div class="todo-tree">
      <template v-if="todoStore.todos.length === 0">
        <div class="empty-state">
          <h3>目標を入力してください</h3>
          <p>AIが自動的に実行可能なステップに分解します</p>
        </div>
      </template>
      <template v-else>
        <div v-for="(level, index) in todoStore.todos" :key="index" class="todo-level fade-in">
          <div class="level-title">
            {{ index === 0 ? '中分類目標' : '具体的なアクション（SMART目標）' }}
          </div>
          <div 
            v-for="(todo, todoIndex) in level" 
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed }"
            @click="toggleTodo(index, todoIndex)"
          >
            <div class="todo-content">
              <div class="todo-checkbox" :class="{ checked: todo.completed }"></div>
              <div class="todo-text">
                {{ todo.text }}
                <span v-if="todo.smart" class="smart-badge">SMART</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div v-if="todoStore.todos.length > 0" class="progress-section">
      <div class="progress-title">全体の進捗</div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: todoStore.progressPercentage + '%' }"></div>
      </div>
      <div class="progress-text">
        {{ todoStore.progressPercentage }}% 完了 ({{ todoStore.completedCount }}/{{ todoStore.totalCount }}個)
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores'

const todoStore = useTodoStore()
const goal = ref('')
const isGenerating = ref(false)

const generateTodos = () => {
  if (!goal.value.trim()) {
    alert('目標を入力してください')
    return
  }

  isGenerating.value = true

  // 2秒後にTodoを表示（AIの処理をシミュレート）
  setTimeout(() => {
    todoStore.generateTodos(goal.value)
    isGenerating.value = false
  }, 2000)
}

const toggleTodo = (levelIndex: number, todoIndex: number) => {
  todoStore.toggleTodo(levelIndex, todoIndex)
}
</script>

<style scoped>
:global(body) {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #4a4a4a 0%, #2c2c2c 100%);
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

.container {
  max-width: 1000px;
  margin: 40px auto;
  background: white;
  border-radius: 0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  padding-bottom: 40px;
}

.header {
  background: linear-gradient(135deg, #6c6c6c 0%, #4a4a4a 100%);
  color: white;
  padding: 30px;
  text-align: center;
}

.header h1 {
  font-size: 2.2em;
  margin-bottom: 10px;
  font-weight: 300;
}

.header p {
  opacity: 0.9;
  font-size: 1.1em;
}

.input-section {
  padding: 30px;
  border-bottom: 1px solid #eee;
}

.goal-input {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.goal-input input {
  flex: 1;
  padding: 15px 20px;
  border: 1px solid #ddd;
  border-radius: 0;
  font-size: 16px;
  transition: all 0.3s ease;
}

.goal-input input:focus {
  outline: none;
  border-color: #666;
  box-shadow: 0 0 0 3px rgba(102, 102, 102, 0.1);
}

.generate-btn {
  padding: 15px 30px;
  background: linear-gradient(135deg, #5a5a5a 0%, #3a3a3a 100%);
  color: white;
  border: none;
  border-radius: 0;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.generate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(90, 90, 90, 0.3);
}

.status {
  text-align: center;
  padding: 10px;
  border-radius: 0;
  margin-top: 15px;
  display: none;
}

.status.generating {
  background: #f5f5f5;
  color: #333;
  display: block;
}

.todo-tree {
  padding: 30px;
}

.todo-level {
  margin-bottom: 30px;
}

.level-title {
  font-size: 1.3em;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.todo-item {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.todo-item:hover {
  background: #f0f0f0;
  border-color: #666;
  transform: translateX(5px);
}

.todo-item.completed {
  background: #e8e8e8;
  border-color: #666;
  opacity: 0.7;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 0;
  cursor: pointer;
  position: relative;
}

.todo-checkbox.checked {
  background: #666;
  border-color: #666;
}

.todo-checkbox.checked::after {
  content: '✓';
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
}

.todo-text {
  flex: 1;
  font-size: 16px;
  line-height: 1.5;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #666;
}

.smart-badge {
  background: #f0f0f0;
  color: #333;
  padding: 4px 8px;
  border-radius: 0;
  font-size: 12px;
  font-weight: 600;
  margin-left: 10px;
}

.progress-section {
  background: #f8f9fa;
  padding: 20px 30px;
  border-top: 1px solid #eee;
}

.progress-title {
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

.progress-bar {
  background: #e9ecef;
  height: 8px;
  border-radius: 0;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  background: linear-gradient(90deg, #666 0%, #888 100%);
  height: 100%;
  border-radius: 0;
  transition: width 0.5s ease;
}

.progress-text {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.empty-state {
  text-align: center;
  padding: 50px;
  color: #999;
}

.empty-state h3 {
  margin-bottom: 10px;
  font-weight: 400;
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .goal-input {
    flex-direction: column;
  }
  
  .container {
    max-width: 98vw;
    margin: 10px;
    border-radius: 0;
    padding-bottom: 20px;
  }
  
  .header, .input-section, .todo-tree {
    padding: 20px;
  }
}
</style> 