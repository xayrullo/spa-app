<template>
  <div
    class="
      flex
      min-h-full
      items-center
      justify-center
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
          alt="Your Company"
        />
        <h2
          class="
            mt-6
            text-center text-3xl
            font-bold
            tracking-tight
            text-gray-900
          "
        >
          Login to your account
        </h2>
      </div>
      <form
        @submit="loginHandler"
        class="mt-8 space-y-6"
        action="#"
        method="POST"
      >
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              v-model="username"
              id="username"
              name="username"
              autocomplete="username"
              required
              class="
                relative
                block
                w-full
                appearance-none
                rounded-none rounded-t-md
                border border-gray-300
                px-3
                py-2
                text-gray-900
                placeholder-gray-500
                focus:z-10
                focus:border-blue-500
                focus:outline-none
                focus:ring-blue-500
                sm:text-sm
              "
              placeholder="Username"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="
                relative
                block
                w-full
                appearance-none
                rounded-none rounded-b-md
                border border-gray-300
                px-3
                py-2
                text-gray-900
                placeholder-gray-500
                focus:z-10
                focus:border-blue-500
                focus:outline-none
                focus:ring-blue-500
                sm:text-sm
              "
              placeholder="Password"
            />
            <template v-if="!isValidPassword && password.length > 0">
              <div class="flex w-full text-red-500 text-sm ml-5">
                <p>Min 6 characters</p>
              </div>
            </template>
          </div>
        </div>

        <div>
          <button
            :isValid="username && isValidPassword"
            type="submit"
            class="
              group
              relative
              flex
              w-full
              justify-center
              rounded-md
              border border-transparent
              bg-blue-600
              py-2
              px-4
              text-sm
              font-medium
              text-white
              hover:bg-blue-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
            "
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <!-- Heroicon name: mini/lock-closed -->
              <svg
                class="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Login
          </button>
          <template v-if="errMsg">
            <p
              class="flex w-full text-red-500 text-sm ml-5 justify-center mr-5"
            >
              {{ errMsg }}
            </p>
          </template>
          <p>
            Don't you have an accout?
            <span
              @click="goToRegister"
              class="
                underline
                font-bold
                cursor-pointer
                text-blue-500
                hover:text-blue-700
              "
              >Register</span
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../components/UI/button.vue";
import { useAuthStore } from "../store/auth";
import { useRegexpStore } from "../store/regexp";

const emits = defineEmits(["login"]);

const username = ref("");
const password = ref("");
const errMsg = ref();

const authStore = useAuthStore();
const regexpStore = useRegexpStore();
const router = useRouter();

const loginHandler = async (e) => {
  e.preventDefault();
  await authStore.loginHandler(username.value, password.value);
  if (!authStore.isLoggedIn) return (errMsg.value = authStore.errMsg);
  emits("login");
  router.push("/products");
};

const goToRegister = () => {
  router.push("/register");
};

const isValidPassword = computed(() => {
  return regexpStore.checkPassword(password.value);
});
</script>

<style lang="scss" scoped>
</style>