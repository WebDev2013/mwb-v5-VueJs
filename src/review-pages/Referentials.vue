<template>
<div>
  <page-common :page="PAGE">
    <button class="referentials-button btn btn-info pull-right" slot="buttons" @click="clickDiagramButton">
      <i class="fa fa-sitemap" aria-hidden="true"></i> Relationship Diagram
    </button>
    <transition name="slide" mode="out-in" slot="graph">
      <referentials-graph v-if="showGraph" ></referentials-graph>
    </transition>
  </page-common>
</div>
</template>

<script>
import PageCommon from './PageCommon'
import ReferentialsGraphComponent from '@/graphs/referentials-graph/ReferentialsGraphComponent'

export default {
  data: function () {
    return {
      PAGE: 'referentials',
      showGraph: false
    }
  },
  methods: {
    clickDiagramButton() {
      this.showGraph = !this.showGraph
    }
  },
  components: {
    'page-common': PageCommon,
    'referentials-graph': ReferentialsGraphComponent
  }
}
</script>

<style src="@/app-animation.css"></style>
<style scoped>
  button.referentials-button {
    margin: auto;
  }
</style>
