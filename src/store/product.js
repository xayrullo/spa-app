import { defineStore } from "pinia";
import axios from "../plugins/axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    pagination: {},
    product: {},
  }),
  getters: {
    getProducts: (state) => {
      return state.products;
    },
  },
  actions: {
    async loadProducts(params) {
      console.log("Params: ", params);
      return new Promise((resolve, reject) => {
        axios
          .get(
            params && params.category
              ? `products/category/${params.category}`
              : "products",
            {
              limit: 12,
              skip: params && params.page ? params.page : 1 /* page number */,
            }
          )
          .then((res) => {
            this.products = res.products;
            this.pagination = {
              limit: res.limit,
              page: res.skip,
              total: res.total,
            };
            resolve(res.products);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {});
      });
    },
  },
});
