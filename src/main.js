import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";

import "./assets/css/index.css";
import { createPinia } from "pinia";

const pinia = createPinia();
createApp(App).use(pinia).use(router).mount("#app");
