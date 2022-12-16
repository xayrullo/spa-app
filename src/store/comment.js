import { defineStore } from "pinia";
import axios from "../plugins/axios";

export const useCommentStore = defineStore("comment", {
  state: () => ({
    comments: [],
  }),
  getters: {
    getComments: (state) => {
      return state.comments;
    },
  },
  actions: {
    async loadComments(params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`comments/post/${params.id}`)
          .then((res) => {
            this.comments = res.comments;
            resolve(res.comments);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {});
      });
    },
    async postComment(params) {
      return new Promise((resolve, reject) => {
        axios
          .post(`comments/add`, params)
          .then((res) => {
            this.comments.push(res);
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
