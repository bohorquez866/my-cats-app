<template>
  <header>
    <h1>Cat Finder</h1>
    <ul class="sections">
      <li
        v-for="(section, index) in HeaderSections"
        :key="section"
        @click="setCurrentSection(section.component)"
      >
        <button type="button" class="btn">{{ section.text }}</button>
      </li>
    </ul>

    <the-searchbar />
  </header>
</template>

<script>
import TheSearchbar from "./TheSearchbar.vue";
import { mapActions } from "vuex";

export default {
  components: {
    TheSearchbar,
  },
  data() {
    return {
      HeaderSections: [
        { component: "catListWrapper", text: "Cat List" },
        { component: "catImageListWrapper", text: "Favorites" },
      ],
    };
  },
  methods: {
    ...mapActions(["setCurrentSection"]),
  },
};
</script>
