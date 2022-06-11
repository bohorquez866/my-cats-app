<template>
  <div>
    <cat-list v-if="favoriteCats?.length > 0">
      <cat-image-card
        v-for="favoriteCat in favoriteCats"
        :key="favoriteCat?.id"
        :cat="favoriteCat"
      />
    </cat-list>
    <not-found v-else />
    <Teleport to="body">
      <the-modal v-if="modalIsOpen" :confirmAction="acceptToRemove()">
        <h2>Do you really want to remove this cat from Favs?</h2>
      </the-modal>
    </Teleport>
  </div>
</template>

<script>
import CatList from "@/components/Layout/CatList.vue";
import CatImageCard from "@/components/FavoriteCats/CatImageCard.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    CatList,
    CatImageCard,
  },

  computed: {
    ...mapState(["favoriteCats", "modalIsOpen"]),
  },
  methods: {
    ...mapActions(["addFavoriteCat"]),

    acceptToRemove() {
      this.addFavoriteCat();
    },
  },
};
</script>
