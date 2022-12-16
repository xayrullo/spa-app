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
  },
});
