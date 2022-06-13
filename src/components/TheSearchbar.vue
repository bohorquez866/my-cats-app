<template>
  <div class="search-bar">
    <input
      v-model="barSearch"
      type="search"
      placeholder="you surely love cats, look for one here . . ."
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      barSearch: "",
    };
  },

  computed: {
    ...mapState(["currentSection", "catSearch", "favoriteCats"]),
  },

  watch: {
    barSearch(value) {
      this.SET_SEARCH(value);
    },
  },

  methods: {
    ...mapMutations(["ADD_FILTERED_FAV_CATS", "SET_SEARCH"]),
  },
};
</script>
