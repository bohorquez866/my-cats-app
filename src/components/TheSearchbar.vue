<template>
  <div class="search-bar">
    <input v-model="searchTerm" type="search" placeholder="I love cats which have . . ." />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  watch: {
    searchTerm(newValue) {
      let filteredCats;
      if (this.currentSection === "catListWrapper") {
        filteredCats = this.cats.filter((cat) =>
          cat.name.toLowerCase().includes(newValue.toLowerCase()),
        );
        console.log(filteredCats);
      } else {
        filteredCats = this.favoriteCats.filter((cat) =>
          cat.name.toLowerCase().includes(newValue.toLowerCase()),
        );
        console.log(filteredCats);
        this.ADD_FILTERED_FAV_CATS(filteredCats);
      }
    },
  },

  computed: {
    ...mapState(["currentSection", "cats", "favoriteCats"]),
  },
  methods: {
    ...mapMutations(["ADD_FILTERED_FAV_CATS", "SET_CATS"]),
  },
};
</script>
