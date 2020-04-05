<template>
  <v-card class="mx-auto mb-3" max-width="80%" @click="go"
          :class="details ? 'details' : 'list'">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="image(item)"
      :lazy-src="placeholder"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5" />
        </v-row>
      </template>
    </v-img>
    <v-card-title v-html="item.title" />
    <v-card-text v-if="details" v-html="item.content[0].content"></v-card-text>
  </v-card>
</template>

<style>
  .v-card.details {
    cursor: auto!important;
  }
</style>
<script lang="ts">
import Vue from 'vue';
import { Feed } from '@/types';

export default Vue.extend({
  name: 'FeedItem' as string,

  props: {
    item: Object,
    details: Boolean,
  },

  methods: {
    image(item: Feed) {
      return item.media.length > 0 ? item.media[0].media.attributes.url : this.placeholder;
    },
    go() {
      if (!this.details) {
        this.$router.push(`details/${this.item.slug}`);
      }
    },
  },

  mounted(): void {
    const images = this.$el.querySelectorAll('.v-card__text img[data-src]') as NodeListOf<HTMLImageElement>;
    images
      .forEach((img: HTMLImageElement) => img.setAttribute('src', img.getAttribute('data-src') ?? ''));
  },

  data: () => ({
    placeholder: 'http://via.placeholder.com/1200x628',
  }),
});
</script>
