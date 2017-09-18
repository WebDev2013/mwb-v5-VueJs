<template>
  <div>
    <a class="file-list-item">
      <search-indicator class="pull-left" v-if="searchFound"></search-indicator>
      <span class="display-name">{{item.displayName}}</span>
      <error-badge class="pull-right" :item="item"></error-badge>
      <span class="effective-time pull-right">{{item.effectiveTime | am-pm}}</span>
    </a>
  </div>
</template>

<script>
import ErrorBadge from '@/common/ErrorBadge.vue'
import SearchIndicator from '@/search/SearchIndicator.vue'
import { formatDate } from '@/common/date.filter'
import { formatAMPM } from '@/common/ampm.filter'

export default {
  props: [
    'item',
  ],
  methods: {
  },
  computed: {
    searchFound() {
      return this.$store.state.search.results.map(r => r.file.name)
        .includes(this.item.name)
    }
  },
  components: {
    'error-badge': ErrorBadge,
    'search-indicator': SearchIndicator,
  },
  filters: {
    date(date, format) {
      return formatDate(date, format)
    },
    'am-pm'(date) {
      return formatAMPM(date)
    },
  }
}
</script>

<style scoped>
  a {
    display: block;
    width: auto;
  }
  a:hover {
    background-color: #2586d7;
  }
  .effective-time {
    margin-right: 0.5em;
  }
  .file-list-item >>> .error-badge { /* use deep selector to style child */
    margin: 0;
  }
  .file-list-item >>> .search-indicator { /* use deep selector to style child */
    margin-right: 0.5em;
  }
</style>
