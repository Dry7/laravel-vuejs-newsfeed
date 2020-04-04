<template>
  <v-container fluid class="align-items-center">
    <FeedItem v-if="details" :item="details" :details="true" />
  </v-container>
</template>

<style>
</style>

<script lang="ts">
import Vue from 'vue';
import { SHOW_DETAILS } from '@/store/actions';
import { mapGetters } from 'vuex';
import FeedItem from '@/components/FeedItem.vue';

export default Vue.extend({
  name: 'Details' as string,

  components: {
    FeedItem,
  },

  computed: {
    ...mapGetters(['details']),
  },

  created(): void {
    this.$store.dispatch(SHOW_DETAILS, { slug: this.$route.params.slug });
  },
});
</script>
