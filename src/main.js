import { createApp } from "vue";
import App from "./App.vue";
import NotFound from "@/components/layout/NotFound.vue";
import TheModal from "@/components/TheModal.vue";
import store from "./store";

const app = createApp(App);

app.use(store);
app.component("not-found", NotFound);
app.component("the-modal", TheModal);
app.mount("#app");
