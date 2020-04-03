<template>
  <v-list-item-group dense>
    <v-list-item @click="() => this.$router.push('/')">
      <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-container v-if="this.$route.name === 'Search'">
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
        @click="$emit('setCategory', category)"
      >
        <v-list-item-action></v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ category.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-container>
  </v-list-item-group>
</template>

<style>
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Menu' as string,

  props: {
    categories: Array,
  },
});
</script>
