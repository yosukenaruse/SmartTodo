<template>
  <div class="mock-root">
    <div class="mock-card">
      <div class="mock-header">
        <h1>SMART Todo</h1>
        <p>目標達成のためのタスク管理</p>
      </div>
      <div class="mock-input-row">
        <input class="mock-goal-input" v-model="goal" placeholder="新しい目標を入力してください（例：ダイエット）" />
        <button class="mock-generate-btn" @click="generateTodos">目標を生成</button>
      </div>
      <div v-if="todoStore.todos.length > 0" class="mock-goal-list">
        <div class="mock-goal-card">
          <div class="mock-goal-title-row">
            <span class="mock-goal-title">{{ todoStore.currentGoal }}</span>
            <button class="mock-close-btn">✕</button>
          </div>
          <div v-for="(breakdown, bIdx) in todoStore.todos" :key="breakdown.id" class="mock-breakdown-card">
            <div class="mock-breakdown-title-row">
              <span class="mock-breakdown-title">{{ breakdown.text }}</span>
              <button class="mock-close-btn">✕</button>
            </div>
            <div v-for="(action, aIdx) in breakdown.subtasks" :key="action.id" class="mock-action-card" :class="{ completed: action.completed }">
              <div class="mock-action-header">
                <input type="checkbox" v-model="action.completed" />
                <span class="mock-action-title">{{ action.text }}</span>
                <button class="mock-close-btn">✕</button>
              </div>
              <div class="mock-reason-box">
                <div class="mock-reason-title">理由・補足</div>
                <div class="mock-reason-content">{{ action.reason }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores'

const todoStore = useTodoStore()
const goal = ref('')

const generateTodos = async () => {
  if (!goal.value.trim()) {
    alert('目標を入力してください')
    return
  }
  await todoStore.generateTodos(goal.value)
}
</script>

<style scoped>
.mock-root {
  min-height: 100vh;
  background: linear-gradient(135deg, #4a4a4a 0%, #2c2c2c 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 0;
}
.mock-card {
  background: #fff;
  border-radius: 0;
  box-shadow: 0 4px 24px rgba(0,0,0,0.13);
  padding: 0 0 32px 0;
  min-width: 700px;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}
.mock-header {
  text-align: center;
  background: linear-gradient(135deg, #6c6c6c 0%, #4a4a4a 100%);
  color: white;
  border-radius: 0;
  padding: 38px 0 24px 0;
  margin-bottom: 32px;
}
.mock-header h1 {
  font-size: 2.2em;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}
.mock-header p {
  color: #e0e0e0;
  font-size: 1.13em;
  margin-bottom: 0;
}
.mock-input-row {
  display: flex;
  gap: 12px;
  margin: 0 32px 32px 32px;
}
.mock-goal-input {
  flex: 1;
  padding: 14px 18px;
  border: 1px solid #ddd;
  border-radius: 0;
  font-size: 1.1em;
  background: #fff;
}
.mock-generate-btn {
  background: #222;
  color: #fff;
  border: none;
  border-radius: 0;
  padding: 0 28px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.mock-generate-btn:hover {
  background: #444;
}
.mock-goal-list {
  margin-top: 16px;
  margin-left: 32px;
  margin-right: 32px;
}
.mock-goal-card {
  background: #fafbfc;
  border: 1.5px solid #e0e0e0;
  border-radius: 0;
  padding: 24px 24px 18px 24px;
  margin-bottom: 32px;
}
.mock-goal-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.mock-goal-title {
  font-size: 1.3em;
  font-weight: 600;
  color: #222;
}
.mock-close-btn {
  background: none;
  border: none;
  color: #bbb;
  font-size: 1.3em;
  cursor: pointer;
  margin-left: 8px;
  transition: color 0.2s;
}
.mock-close-btn:hover {
  color: #d63031;
}
.mock-breakdown-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 0;
  padding: 18px 18px 10px 18px;
  margin-bottom: 18px;
}
.mock-breakdown-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.mock-breakdown-title {
  font-size: 1.1em;
  font-weight: 500;
  color: #333;
}
.mock-action-card {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 0;
  padding: 14px 16px 10px 16px;
  margin-bottom: 12px;
}
.mock-action-card.completed {
  opacity: 0.6;
}
.mock-action-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.mock-action-title {
  font-size: 1em;
  font-weight: 500;
  color: #222;
  flex: 1;
}
.mock-reason-box {
  background: #f4f4f4;
  border: 1px solid #e0e0e0;
  border-radius: 0;
  padding: 10px 12px;
  margin-top: 4px;
}
.mock-reason-title {
  font-size: 0.95em;
  color: #888;
  font-weight: 600;
  margin-bottom: 2px;
}
.mock-reason-content {
  font-size: 0.98em;
  color: #444;
  line-height: 1.6;
}
</style> 