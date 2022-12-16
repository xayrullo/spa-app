import { defineStore } from "pinia";
import uniqid from "uniqid";
import axios from "../plugins/axios";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
  }),
  getters: {
    getCategories: (state) => {
      return state.categories;
    },
  },
  actions: {
    async loadCategories(params) {
      return new Promise((resolve, reject) => {
        axios
          .get("products/categories", params)
          .then((res) => {
            this.categories = res;
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {});
      });
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
      console.log("todos: ", this.todos);
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
      console.log("five");
      this.todos.forEach((element) => {
        if (element.id === id) element.content = changedContent;
      });
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
});
