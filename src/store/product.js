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
      console.log(params);
      return new Promise((resolve, reject) => {
        axios
          .get(
            params && params.category
              ? `products/category/${params.category}`
              : "products",
            {
              limit: this.pagination.limit,
              skip: (params.page - 1) * 12,
            }
          )
          .then((res) => {
            this.products = res.products;
            this.pagination = {
              limit: 12,
              page: params.page,
              total: res.total,
              pageCount:
                res.total % 12 > 0
                  ? Math.trunc(res.total / 12) + 1
                  : res.total / 12,
            };
            resolve(res.products);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {});
      });
    },
    async loadDetail(params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`products/${params.id}`)
          .then((res) => {
            this.product = res;
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
