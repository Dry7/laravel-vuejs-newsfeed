<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
          <v-list-item-content><v-list-item-title>Home</v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Categories</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-for="category in categories" :key="category.id">
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ category.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>News feed</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <Feed></Feed>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { LOAD_CATEGORIES } from '@/store/actions';
import Feed from '@/components/Feed.vue';

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
    ...mapGetters(['categories']),
  },

  data: () => ({
    drawer: null,
  }),
});
</script>
