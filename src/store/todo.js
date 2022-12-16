import { defineStore } from "pinia";
import uniqid from "uniqid";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
    doneTodos: [],
  }),
  getters: {
    getTodos: (state) => {
      return state.todos.filter((el) => el.done === false);
    },
    getDoneTodos: (state) => {
      return state.todos.filter((el) => el.done === true);
    },
  },
  actions: {
    async loadTodos() {
      if (localStorage.getItem("todos")) {
        this.todos = JSON.parse(localStorage.getItem("todos"));
      }
    },
    addTodoList(text) {
      this.todos.push({
        content: text,
        done: false,
        date: Date.now(),
        id: uniqid(),
      });
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    deleteTodoList(id) {
      const todoInd = this.todos.findIndex((el) => el.id === id);
      if (todoInd) this.todos.splice(todoInd, 1);
    },
    deleteAllTodos() {},
    setTodoDone(id) {
      this.todos.forEach((element) => {
        if (element.id === id) element.done = true;
      });
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    setTodoUndone(id) {
      this.todos.forEach((element) => {
        if (element.id === id) element.done = false;
      });
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    editTodo(id, changedContent) {
      this.todos.forEach((element) => {
        if (element.id === id) element.content = changedContent;
      });
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
});
