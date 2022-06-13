<template>
  <div>
    <cat-list v-if="filteredCats?.length > 0">
      <cat-card class="cat-card" v-for="cat in filteredCats" :key="cat.id" :cat="cat" />
      <the-pagination :actions="paginationActions" />
    </cat-list>
    <not-found v-else-if="!filteredCats?.length" />
  </div>
</template>

<script>
import CatCard from "@/components/CatList/CatCard.vue";
import CatList from "@/components/Layout/CatList.vue";
import ThePagination from "@/components/ThePagination.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  components: { CatList, CatCard, ThePagination },

  created() {
    this.fetchCats();
  },

  computed: {
    ...mapState(["filteredCats", "catFetchOps"]),
    ...mapGetters(["filteredCats"]),

    page() {
      return this.catFetchOps.page;
    },

    paginationActions() {
      return {
        pageCounter: this.page,
        showPreviousPage: this.setPreviousPage,
        showNextPage: this.setNextPage,
      };
    },
  },

  methods: {
    ...mapActions(["fetchCats", "showNextPage", "showPreviousPage"]),

    setNextPage() {
      this.showNextPage();
    },

    setPreviousPage() {
      this.showPreviousPage();
    },
  },
};
</script>
