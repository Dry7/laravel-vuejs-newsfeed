<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app temporary>
      <Menu :categories="categories" @setCategory="setCategory($event)"/>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>News feed</v-toolbar-title>
    </v-app-bar>

    <v-content class="align-items-center justify-center">
      <router-view></router-view>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<style type="scss">
  .search__query {
    max-width: 700px!important;
    margin: 0 auto;
  }
</style>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import * as actions from '@/store/actions';
import { Category } from '@/types';
import Menu from '@/components/Menu.vue';

export default Vue.extend({
  name: 'App' as string,
  components: {
    Menu,
  },

  mounted(): void {
    this.$store.dispatch(actions.LOAD_CATEGORIES);
  },

  props: {
    source: String,
  },

  computed: {
    ...mapGetters(['categories', 'category', 'loading']),
  },

  methods: {
    setCategory(category: Category | null) {
      this.scrollToTop();
      this.$store
        .dispatch(
          actions.SET_CATEGORY,
          category && category.id !== this.category ? category.id : null,
        )
        .then(() => this.$store.dispatch(actions.LOAD_FEED))
        .then(() => { this.drawer = false; });
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },

  data: () => ({
    drawer: true,
    query: null,
  }),
});
</script>
