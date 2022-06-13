<template>
  <section class="navigation">
    <button @click="actions?.showPreviousPage">-</button>
    <span>{{ actions?.pageCounter }}</span>
    <button @click="actions?.showNextPage">+</button>
  </section>
</template>

<script>
export default {
  props: {
    actions: {
      pageCounter: {
        type: Number,
      },
      showNextPage: {
        type: Function,
      },
      showPreviousPage: {
        type: Function,
      },
    },
  },
  data() {
    return {
      breadCrums: [],
    };
  },

  mounted() {},
  updated() {},
  computed: {},
  methods: {},
};
</script>
