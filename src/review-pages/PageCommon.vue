<template>
  <div class="container-fluid">

    <div class="row bannertitle-container">
      <div class="row bannertitle">
        <h1>{{config.page.pageTitle}}</h1>
        <slot name="buttons"></slot>
        <search v-if="$mq.resize && $mq.above('768px')" :page="page"></search>
        <search-mobile v-if="$mq.resize && $mq.below('769px')" :page="page"></search-mobile>
      </div>
      <small>{{config.page.pageDescription}}</small>
      <hr/>
    </div>

    <slot name="graph"></slot>

    <div :id="'filecontent'" class="row">

      <div class="filelistcontainer" :class="'col-md-' + config.page.listWidth">
        <file-list :page="page" :id="'filelist'" :title="config.page.listTitle"
          @fileSelected="handleFileChange($event)" 
          @numDisplayedChanged="handleNumDisplayedChange($event)">
        </file-list>
      </div>

      <div class="result" :class="'col-md-' + (12 - config.page.listWidth)">
        <mu-card>
          <div class="header row">

            <div class="header-title col-md-10">
              <h3 class="title">
                <span class="titleText">{{fileInfo.name}}</span>
                <error-badge :id="'errorbadge'" :item="fileInfo" :units="config.page.badgeUnits"></error-badge>
                <search-indicator class="search-indicator pull-right" v-if="searchFound" :count="searchCount"></search-indicator>
              </h3>
              <h6>
                <span>Last modified: {{ lastModified }}</span>
              </h6>
            </div>

            <div class="header-refresh col-md-2">
              <h2>
                <a v-on:click="refresh" class="refresh-page-button pointable">
                  <i class="fa fa-md fa-refresh pull-right" aria-hidden="true"></i>
                </a>
              </h2>
              <h6 class="last-refresh-label pull-right">
                <span v-if="fileInfo.lastRefresh">Refreshed</span>
                <span>{{fileInfo.lastRefresh | am-pm}}</span>
              </h6>
            </div>

          </div>
          <div class="result-wrapper">
            <result-wrapper :page="page" :content="fileInfo.content" :zoom="config.page.resultsZoom"></result-wrapper>
          </div>
        </mu-card>
      </div>
    </div>
  </div>
</template>

<script>
import ConfigService from '../services/config.service'
import DataService from '../services/data.service'
import ErrorBadge from '@/common/ErrorBadge.vue'
import { formatDate } from '@/common/date.filter'
import { formatAMPM } from '@/common/ampm.filter'
import ResultWrapper from './components/ResultWrapper.vue'
import FileList from './components/FileList.vue'
import Search from '@/search/Search.vue'
import Search2 from '@/search/Search2.vue'
import SearchIndicator from '@/search/SearchIndicator.vue'

export default {
  props: [
    'page',
  ],
  computed: {
    fileInfo() {
      const selected = this.$store.state.pages.selected[this.page]
      return this.$store.state.pages.files[this.page][selected] || { name: 'loading' }
    },
    numVisible() {
      return this.$store.state.pages.numVisible[this.page]
    },
    fileCount() {
      return this.$store.state.pages.files[this.page].length
    },
    visibleFiles() {
      return this.$store.getters.visibleFiles[this.page]
    },
    config() {
      return this.$store.state.config[this.page + 'Config'] 
    },
    lastModified() {
      return this.fileInfo && this.fileInfo.lastModified
        ? formatDate(this.fileInfo.lastModified, 'DD MMM YYYY')
        : '' 
    },
    searchResult() {
      return this.$store.state.search.results.find(r => r.file.name === this.fileInfo.name)
    },
    searchFound() {
      return !!this.searchResult
    },
    searchCount() {
      return this.searchResult ? this.searchResult.count : 0;
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize () {
      ConfigService.checkConfig()
        .then(_ => {
          DataService.checkFiles(this.page)
        })
    },
    refresh() {
    }
  },
  components: {
    'file-list': FileList,
    'error-badge': ErrorBadge,
    'result-wrapper': ResultWrapper,
    'search': Search,
    'search-mobile': Search2,
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

<style src='./PageCommon.css' scoped>
</style>
