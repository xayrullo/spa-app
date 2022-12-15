import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    auth: "",
    isLoggedIn: false,
    errMsg: "",
    userInfo: null,
  }),
  actions: {
    async registerHandler(username, password) {
      return new Promise(async (res, rej) => {
        localStorage.setItem("DB", `${username} ${password}`);
        localStorage.setItem(
          "token",
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9${username}${password}eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
        );
        this.isLoggedIn = true;
        res({ username });
      });
    },
    async loginHandler(username, password) {
      const DB = localStorage.getItem("DB");
      if (DB) {
        this.auth = DB.split(" ");
        if (
          this.auth.length &&
          this.auth[0] === username &&
          this.auth[1] === password
        ) {
          localStorage.setItem(
            "token",
            `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9${username}${password}eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
          );
          return (this.isLoggedIn = true);
        }
        this.errMsg = "Invalid username or password";
        return;
      }
      this.errMsg = "No account found with that email";
      return;
    },
    getCurrentUser() {
      const token = localStorage.getItem("token");
      if (token) this.isLoggedIn = true;
      else this.isLoggedIn = false;
    },
    userSignOut() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
    },
  },
});
