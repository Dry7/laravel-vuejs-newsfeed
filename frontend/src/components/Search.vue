<template>
  <div>
    <v-text-field v-debounce:300="setQuery" class="search__query" />
    <Feed @load-more="loadMore" />
  </div>
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

export default Vue.extend({
  name: 'Search' as string,
  components: {
    Feed,
  },

  props: {
    source: String,
  },

  computed: {
    ...mapGetters(['category', 'loading']),
  },

  methods: {
    setQuery(query: string) {
      console.log('setQuery');
      this.$store
        .dispatch(actions.SET_QUERY, query)
        .then(() => this.$store.dispatch(actions.LOAD_FEED));
    },
    loadMore() {
      if (!this.loading) {
        this.$store.dispatch(actions.NEXT_PAGE);
      }
    },
  },
});
</script>
