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
      <Feed  @load-more="loadMore" />
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
import Feed from '@/components/Feed.vue';
import { Category } from '@/types';

export default Vue.extend({
  name: 'HelloWorld' as string,
  components: {
    Feed,
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
    home() {
      this.setCategory(null);
    },
    setCategory(category: Category | null) {
      this.scrollToTop();
      this.query = null;
      this.$store
        .dispatch(
          actions.SET_CATEGORY,
          category && category.id !== this.category ? category.id : null,
        )
        .then(() => this.$store.dispatch(actions.LOAD_FEED))
        .then(() => { this.drawer = false; });
    },
    setQuery(query: string) {
      this.$store
        .dispatch(actions.SET_QUERY, query)
        .then(() => this.$store.dispatch(actions.LOAD_FEED));
    },
    loadMore() {
      if (!this.loading) {
        this.$store.dispatch(actions.NEXT_PAGE);
      }
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
