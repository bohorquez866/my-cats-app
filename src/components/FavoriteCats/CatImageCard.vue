<template>
  <li class="cat-image-card cat-card">
    <img :src="cat?.image.url" :alt="cat?.id" />
    <p>{{ cat?.name }}</p>

    <button class="btn btn__fav-cat" :class="{ 'is-fav': isFavorite }" @click="sendDataToModal">
      &#x2764;
    </button>
  </li>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  props: {
    cat: Object,
  },

  computed: {
    ...mapGetters(["filteredFavoriteCats"]),
    isFavorite() {
      return this.filteredFavoriteCats.includes(this.cat);
    },
  },

  methods: {
    ...mapActions(["showModal"]),
    ...mapMutations(["SELECT_FAV_CAT"]),

    sendDataToModal() {
      this.showModal(true);
      this.SELECT_FAV_CAT(this.cat);
    },
  },
};
</script>
