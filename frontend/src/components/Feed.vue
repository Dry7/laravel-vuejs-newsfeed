<template>
  <div>
    <v-container fluid class="align-items-center">
      <v-row dense>
        <v-col :cols="12">
          <DynamicScroller
            :items="feed"
            :min-item-size="264"
            page-mode
          >
            <template v-slot="{ item, index, active }">
              <DynamicScrollerItem
                class="scroller"
                :item="item"
                :active="active"
                :size-dependencies="[item.title, image(item)]"
                :data-index="index"
              >
                <v-card
                  class="mx-auto mb-3"
                  max-width="700"
                >
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="image(item)"
                    :lazy-src="placeholder"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate color="grey lighten-5" />
                      </v-row>
                    </template>
                  </v-img>
                  <v-card-title v-html="item.title" />
                </v-card>
              </DynamicScrollerItem>
            </template>
          </DynamicScroller>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
  .scroller {
    height: 100%;
  }
</style>

<script lang="ts">
import Vue from 'vue';
import { SEARCH_FEED } from '@/store/actions';
import { mapGetters } from 'vuex';
import { Feed } from '@/types';

export default Vue.extend({
  name: 'Feed' as string,

  mounted(): void {
    this.$store.dispatch(SEARCH_FEED);
  },

  methods: {
    image(item: Feed) {
      return item.media.length > 0 ? item.media[0].media.attributes.url : this.placeholder;
    },
  },

  computed: {
    ...mapGetters(['feed']),
  },

  data: () => ({
    placeholder: 'https://picsum.photos/id/11/100/60',
  }),
});
</script>
