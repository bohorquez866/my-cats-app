<template>
  <cat-list v-if="cats?.length > 0">
    <cat-card class="cat-card" v-for="cat in cats" :key="cat.id" :cat="cat" />
    <button @click="showPreviousPage">-</button>
    <span>{{ catFetchOps.page }}</span>
    <button @click="showNextPage">+</button>
  </cat-list>
  <not-found v-else />
</template>

<script>
import CatCard from "@/components/CatList/CatCard.vue";
import CatList from "@/components/Layout/CatList.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: { CatList, CatCard },

  created() {
    this.fetchCats();
  },

  computed: mapState(["cats", "catFetchOps"]),

  methods: {
    ...mapActions(["fetchCats", "showNextPage", "showPreviousPage"]),
  },
};
</script>
