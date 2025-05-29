<template>
  <div class="login-container">
    <div class="login-box">
      <h1>SMART Todo</h1>
      <p>目標を達成するための最適なステップを提供します</p>
      <button class="login-btn" @click="handleLogin">
        ログイン
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogin = () => {
  router.push('/todo')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4a4a4a 0%, #2c2c2c 100%);
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 0;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  max-width: 400px;
  width: 90%;
}

.login-box h1 {
  font-size: 2.2em;
  margin-bottom: 10px;
  font-weight: 300;
  color: #333;
}

.login-box p {
  color: #666;
  margin-bottom: 30px;
}

.login-btn {
  padding: 15px 40px;
  background: linear-gradient(135deg, #5a5a5a 0%, #3a3a3a 100%);
  color: white;
  border: none;
  border-radius: 0;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(90, 90, 90, 0.3);
}
</style> 