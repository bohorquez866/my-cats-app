<template>
  <div>
    <cat-list v-if="paginatedFilteredFavoriteCats?.length > 0">
      <cat-image-card
        v-for="favoriteCat in paginatedFilteredFavoriteCats"
        :key="favoriteCat?.id"
        :cat="favoriteCat"
      />

      <the-pagination :actions="paginationActions" />
    </cat-list>
    <not-found v-else />

    <Teleport to="body">
      <the-modal v-if="modalIsOpen" :confirmAction="acceptToRemove">
        <h2>Do you really want to remove this cat from Favs?</h2>
      </the-modal>
    </Teleport>
  </div>
</template>

<script>
import CatList from "@/components/Layout/CatList.vue";
import CatImageCard from "@/components/FavoriteCats/CatImageCard.vue";
import ThePagination from "../ThePagination.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  components: { CatList, CatImageCard, ThePagination },

  computed: {
    ...mapState(["modalIsOpen", "FavCatToRemove", "FavPage"]),
    ...mapGetters(["filteredFavoriteCats", "paginatedFilteredFavoriteCats"]),

    currentPage() {
      return this.FavPage.count;
    },

    pageSize() {
      return this.filteredFavoriteCats.length;
    },

    finalIndex() {
      return this.FavPage.count * 6;
    },

    paginated() {
      return this.filteredFavoriteCats.slice(this.indexStart, this.indexEnd);
    },

    paginationActions() {
      return {
        pageCounter: this.currentPage,
        showNextPage: this.showNextPage,
        showPreviousPage: this.showPreviousPage,
      };
    },
  },
  methods: {
    ...mapActions(["addFavoriteCat"]),
    ...mapMutations(["SET_FAV_PAGE", "HANDLE_FAV_PAGE"]),

    acceptToRemove(cat) {
      this.addFavoriteCat(this.FavCatToRemove);
    },

    paginationNextPage() {
      paginationData = this.filteredFavoriteCats;
    },

    showNextPage() {
      if (this.finalIndex < this.pageSize) {
        this.HANDLE_FAV_PAGE();
      }
    },

    showPreviousPage() {
      if (this.currentPage > 1) {
        this.HANDLE_FAV_PAGE("decrease");
      }
    },
  },
};
</script>
