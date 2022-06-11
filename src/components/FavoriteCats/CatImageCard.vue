<template>
  <li class="cat-image-card">
    <img :src="cat?.image.url" :alt="cat?.id" />
    <p>{{ cat?.name }}</p>

    <button class="btn btn__fav-cat" :class="{ 'is-fav': isFavorite }" @click="showModal(true)">
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
    ...mapActions(["addFavoriteCat", "showModal"]),

    passCatAsProp(cat) {
      this.addFavoriteCat(cat);
    },
  },
};
</script>
