<template>
  <div>
    <v-container fluid class="align-items-center">
      <v-row dense>
        <v-col :offset="3" :cols="6">
          <DynamicScroller
            :items="feed"
            :min-item-size="264"
            page-mode
            v-infinite-scroll="() => this.$emit('load-more')"
          >
            <template v-slot="{ item, index, active }">
              <DynamicScrollerItem
                class="scroller"
                :item="item"
                :active="active"
                :size-dependencies="[item.title, item.media]"
                :data-index="index"
              >
                <FeedItem :item="item" :details="false" />
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
import { LOAD_FEED } from '@/store/actions';
import { mapGetters } from 'vuex';
import { Feed } from '@/types';
import FeedItem from '@/components/FeedItem.vue';

export default Vue.extend({
  name: 'Feed' as string,

  components: {
    FeedItem,
  },

  mounted(): void {
    this.$store.dispatch(LOAD_FEED);
  },

  computed: {
    ...mapGetters(['feed']),
  },
});
</script>
