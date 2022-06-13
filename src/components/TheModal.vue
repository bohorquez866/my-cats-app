<template>
  <section class="modal">
    <div class="modal-content">
      <slot></slot>
      <div>
        <button class="btn btn-cancel" @click="cancelModal">Cancel</button>
        <button class="btn btn-confirm" @click="confirmActionLocal">Confirm</button>
      </div>
    </div>

    <div class="background" @click="cancelModal"></div>
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
      this.confirmAction();
      this.showModal(false);
    },
  },
};
</script>
