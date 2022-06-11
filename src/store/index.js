import { createStore } from "vuex";
import { apiKey } from "../../config";
const store = createStore({
  state() {
    return {
      cats: [],
      catFetchOps: { page: 1, limit: 6 },
      favoriteCats: [],
      currentSection: "catListWrapper",
      modalIsOpen: false,
      FavCatToRemove: null,
    };
  },

  getters: {
    catFetchConfig(state) {
      const config = {
        url: `https://api.thecatapi.com/v1/breeds?limit=${state.catFetchOps.limit}&page=${state.catFetchOps.page}&api_key=${apiKey}`,
        headerOps: {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
        },
      };

      return config;
    },
  },

  mutations: {
    SET_SECTION(state, section) {
      state.currentSection = section;
    },

    SHOW_MODAL(state, modal) {
      state.modalIsOpen = modal;
    },

    SET_CATS(state, cats) {
      state.cats = cats;
    },

    SHOW_NEXT_PAGE(state) {
      if (state.catFetchOps.page < 5) {
        state.catFetchOps.page++;
      }
    },

    SHOW_PREV_PAGE(state) {
      if (state.catFetchOps.page > 1) {
        state.catFetchOps.page--;
      }
    },
    SHOW_PAGE_NUMBER(state, pageNumber) {
      state.catFetchOps.page = pageNumber;
    },
    ADD_FAVORITE_CAT(state, cat) {
      if (!state.favoriteCats.includes(cat)) {
        state.favoriteCats.push(cat);
      } else {
        state.favoriteCats.splice(state.favoriteCats.indexOf(cat), 1);
      }
    },
    ADD_FILTERED_FAV_CATS(state, filteredCats) {
      state.favoriteCats = filteredCats;
    },
    SELECT_FAV_CAT(state, favCat) {
      state.FavCatToRemove = favCat;
    },
  },

  actions: {
    async fetchCats({ commit, getters }) {
      const catsdata = await fetch(getters.catFetchConfig.url, getters.catFetchConfig.headerOps);
      const cats = await catsdata.json();
      try {
        commit("SET_CATS", cats);
      } catch (err) {
        console.log(err);
      }
    },

    async showNextPage({ dispatch, commit }) {
      commit("SHOW_NEXT_PAGE");
      dispatch("fetchCats");
    },

    async showPreviousPage({ dispatch, commit }) {
      commit("SHOW_PREV_PAGE");
      dispatch("fetchCats");
    },

    async showPageNumber({ dispatch, commit }, pageNumber) {
      commit("SHOW_PAGE_NUMBER", pageNumber);
      dispatch("fetchCats");
    },

    addFavoriteCat({ commit }, cat) {
      commit("ADD_FAVORITE_CAT", cat);
    },

    setCurrentSection({ commit }, section) {
      commit("SET_SECTION", section);
    },

    showModal({ commit }, modal) {
      commit("SHOW_MODAL", modal);
    },

    showModalAndSelectFavCat({ commit }, favCat) {
      commit("SELECT_FAV_CAT", favCat);
    },
  },
});

export default store;
