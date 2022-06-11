<template>
  <section class="modal">
    <slot></slot>
    <div>
      <button @click="cancelModal">Cancel</button>
      <button @click="confirmActionLocal">Confirm</button>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["confirmAction"],

  methods: {
    ...mapActions(["showModal"]),
    cancelModal() {
      this.showModal(false);
    },
    confirmActionLocal() {
      const tp = typeof this.confirmAction;
      console.log(tp, this.confirmAction);
      this.showModal(false);
    },
  },
};
</script>
