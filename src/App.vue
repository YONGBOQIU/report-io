<script setup lang="ts">
import { ref, computed } from 'vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

const newTodo = ref('')
const todos = ref<Todo[]>([])
let nextId = 0

const remaining = computed(() => todos.value.filter(t => !t.done).length)

function addTodo() {
  const text = newTodo.value.trim()
  if (!text) return
  todos.value.push({ id: nextId++, text, done: false })
  newTodo.value = ''
}

function removeTodo(id: number) {
  todos.value = todos.value.filter(t => t.id !== id)
}

function clearDone() {
  todos.value = todos.value.filter(t => !t.done)
}
</script>

<template>
  <div class="app">
    <h1>📝 待办清单</h1>

    <form class="input-row" @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="添加新任务..." />
      <button type="submit">添加</button>
    </form>

    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" :class="{ done: todo.done }">
        <label>
          <input type="checkbox" v-model="todo.done" />
          <span>{{ todo.text }}</span>
        </label>
        <button class="delete" @click="removeTodo(todo.id)">✕</button>
      </li>
    </ul>

    <p v-if="todos.length" class="footer">
      剩余 {{ remaining }} 项未完成
      <button v-if="todos.length > remaining" @click="clearDone">清除已完成</button>
    </p>
  </div>
</template>

<style scoped>
.app {
  max-width: 480px;
  margin: 40px auto;
  font-family: system-ui, sans-serif;
}
h1 { text-align: center; }
.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.input-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
.input-row button {
  padding: 8px 16px;
  background: #42b883;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.todo-list {
  list-style: none;
  padding: 0;
}
.todo-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.todo-list li.done span {
  text-decoration: line-through;
  color: #999;
}
.delete {
  background: none;
  border: none;
  color: #e55;
  cursor: pointer;
  font-size: 16px;
}
.footer {
  margin-top: 12px;
  color: #666;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer button {
  padding: 4px 10px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}
</style>
