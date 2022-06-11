<template>
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
import { mapState } from "vuex";
export default {
  components: {
    CatImageListWrapper,
    CatListWrapper,
    TheHeader,
  },

  computed: {
    ...mapState(["currentSection"]),
  },
};
</script>

<style lang="scss">
@use "./sass/styles.scss";
</style>
