<template>
  <li v-if="cat">
    <img v-if="cat?.image?.url" :src="cat.image.url" :alt="cat.image.id" />
    <h2>{{ cat.name }}</h2>
    <p>{{ cat.origin }}</p>
    <p>{{ cat.description }}</p>
    <button class="btn btn__fav-cat" :class="{ 'is-fav': isFavorite }" @click="addFavoriteCat(cat)">
      &#x2764;
    </button>
  </li>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    cat: Object,
  },

  computed: {
    ...mapState(["favoriteCats"]),
    isFavorite() {
      return this.favoriteCats.includes(this.cat);
    },
  },

  methods: {
    ...mapActions(["addFavoriteCat"]),
  },
};
</script>
