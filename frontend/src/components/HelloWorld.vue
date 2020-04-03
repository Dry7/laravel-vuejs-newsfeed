<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list-item-group dense>
        <v-list-item @click="home">
          <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Categories</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link v-for="category in categories"
          :key="category.id"
          :value="category.id"
          @click="setCategory(category)"
        >
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ category.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>News feed</v-toolbar-title>
    </v-app-bar>

    <v-content class="align-items-center justify-center">
      <v-text-field v-model="query" v-debounce:300="setQuery" class="search__query" />
      <Feed />
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
import {
  LOAD_CATEGORIES,
  SEARCH_FEED,
  SET_CATEGORY,
  SET_QUERY,
} from '@/store/actions';
import Feed from '@/components/Feed.vue';
import { Category } from '@/types';

export default Vue.extend({
  name: 'HelloWorld' as string,
  components: {
    Feed,
  },

  mounted(): void {
    this.$store.dispatch(LOAD_CATEGORIES);
  },

  props: {
    source: String,
  },

  computed: {
    ...mapGetters(['categories', 'category']),
  },

  methods: {
    home() {
      this.setCategory(null);
    },
    setCategory(category: Category | null) {
      this.query = null;
      this.$store
        .dispatch(SET_CATEGORY, category ? category.id : null)
        .then(() => this.$store.dispatch(SET_QUERY, ''))
        .then(() => this.$store.dispatch(SEARCH_FEED))
        .then(() => { this.drawer = false; });
    },
    setQuery(query: string) {
      this.$store
        .dispatch(SET_QUERY, query)
        .then(() => this.$store.dispatch(SEARCH_FEED));
    },
  },

  data: () => ({
    drawer: true,
    query: null,
  }),
});

</script>
