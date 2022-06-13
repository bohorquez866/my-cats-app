import { createStore } from "vuex";
import { apiKey } from "../../config";
const store = createStore({
  state() {
    return {
      cats: [],
      favoriteCats: [],
      catFetchOps: { page: 1, limit: 6 },
      currentSection: "catListWrapper",
      catSearch: "",
      modalIsOpen: false,
      FavCatToRemove: null,
      FavPage: { action: "increase", count: 1 },
      loading: true,
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

    filteredCats(state, search) {
      if (state.currentSection === "catListWrapper") {
        return state.cats.filter((cat) =>
          cat?.name.toLowerCase().includes(state.catSearch.toLowerCase()),
        );
      }
    },

    filteredFavoriteCats(state) {
      if (state.currentSection === "catImageListWrapper") {
        return state.favoriteCats.filter((cat) =>
          cat?.name.toLowerCase().includes(state.catSearch.toLowerCase()),
        );
      }
    },

    paginatedFilteredFavoriteCats(state, getters) {
      const numberOfCats = 6;
      const initialIndex = (state.FavPage.count - 1) * numberOfCats;
      const finalIndex = state.FavPage.count * numberOfCats;
      return getters.filteredFavoriteCats?.slice(initialIndex, finalIndex);
    },
  },

  mutations: {
    HANDLE_FAV_PAGE(state, action = "increase") {
      state.FavPage.action = action;

      if (state.FavPage.action === "increase") {
        state.FavPage.count++;
      } else {
        state.FavPage.count--;
      }
    },

    TOGGLE_LOADING(state, loading) {
      state.loading = loading;
    },

    SET_FAV_PAGE(state, page) {
      state.FavPage = page;
    },

    SET_SECTION(state, section) {
      state.currentSection = section;
    },

    SHOW_MODAL(state, modal) {
      state.modalIsOpen = modal;
    },

    SET_SEARCH(state, search) {
      state.catSearch = search;
    },

    SET_CATS(state, cats) {
      state.cats = cats;
    },

    SHOW_NEXT_PAGE(state) {
      if (state.catFetchOps.page < 5) {
        this.commit("TOGGLE_LOADING", true);
        state.catFetchOps.page++;
      }
    },

    SHOW_PREV_PAGE(state) {
      if (state.catFetchOps.page > 1) {
        this.commit("TOGGLE_LOADING", true);
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
      } finally {
        commit("TOGGLE_LOADING", false);
      }
    },

    async showNextPage({ dispatch, commit }) {
      dispatch("fetchCats");
      commit("SHOW_NEXT_PAGE");
    },

    async showPreviousPage({ dispatch, commit }) {
      dispatch("fetchCats");
      commit("SHOW_PREV_PAGE");
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
