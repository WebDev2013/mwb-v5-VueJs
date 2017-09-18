<template>
  <div :id="'borderwrapper'" class="borderwrapper">
    <h4 class="title">{{title}}</h4>
    <div :id="'scrollwrapper'" class="scrollwrapper" scrollbarPaddingAdjust>
      <div :id="'listwrapper'" class="listwrapper">
        <ul :id="'scrollingList'">
          <li v-for="(item, index) of visibleFiles" :key="index" v-on:click=selectFile(index)>
            <file-list-item :item="item"></file-list-item>
          </li>
          <list-limiter id="limiter" :page="page" :tooltip="'Show older dates'" ></list-limiter>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorBadge from '@/common/ErrorBadge.vue'
import ListLimiter from './ListLimiter.vue'
import FileListItem from './FileListItem.vue'

export default {
  props: [
    'page',
    'title',
  ],
  methods: {
    selectFile(index) {
      this.$store.state.pages.selected[this.page] = index 
    },
  },
  computed: {
    numVisible() {
      return this.$store.state.pages.numVisible[this.page]
    },
    fileCount() {
      return this.$store.state.pages.files[this.page].length
    },
    visibleFiles() {
      const numVisible = this.$store.state.pages.numVisible[this.page]
      const files = this.$store.state.pages.files[this.page]
      return files.slice(0, numVisible)
    },
    searchFound(item) {
      return this.$store.state.search.results.includes(item.name)
    }
  },
  components: {
    'list-limiter': ListLimiter,
    'file-list-item': FileListItem,
  }
}
</script>

<style scoped src="./FileList.css">
</style>
