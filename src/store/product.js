import { defineStore } from "pinia";
import axios from "../plugins/axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    pagination: {
      limit: 12,
      page: 1,
      total: 0,
      pageCount: 1,
    },
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
              limit: this.pagination.limit,
              skip:
                params && params.page
                  ? params.page
                  : this.pagination.page /* page number */,
            }
          )
          .then((res) => {
            this.products = res.products;
            this.pagination = {
              limit: res.limit,
              page: res.skip,
              total: res.total,
              pageCount:
                res.total % res.limit > 0
                  ? Math.trunc(res.total / res.limit) + 1
                  : res.total / res.limit,
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
