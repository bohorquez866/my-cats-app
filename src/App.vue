<template>
  <load-animation v-if="loading" />
  <the-header />
  <main>
    <Transition>
      <keep-alive>
        <component :is="currentSection" />
      </keep-alive>
    </Transition>
  </main>
</template>

<script>
import CatListWrapper from "@/components/CatList/CatListWrapper.vue";
import CatImageListWrapper from "@/components/FavoriteCats/CatImageListWrapper.vue";
import TheHeader from "@/components/TheHeader.vue";
import LoadAnimation from "@/components/LoadAnimation.vue";
import { mapState } from "vuex";
export default {
  components: {
    CatImageListWrapper,
    CatListWrapper,
    TheHeader,
    LoadAnimation,
  },

  computed: {
    ...mapState(["currentSection", "loading"]),
  },
};
</script>

<style lang="scss">
@use "./sass/styles.scss";
</style>
