<template>
  <mu-card>
  <!-- <div mdl-card mdl-shadow--2dp> -->
    <div class="dashboard container-fluid">
      <h1>Dashboard</h1>
      <span>Summary of errors, load failures, clinic matching, team tasks</span>
      <hr />
      <div class="thumbnails row">
        <div class="dashboard-thumbnail-outer col-md-8 col-md-offset-2" v-for="measure of measures" :key="measure.id" >
          <dashboard-thumbnail :measure="measure" class=""></dashboard-thumbnail>
        </div>
      </div>
    </div>
  </mu-card>
  <!-- </div> -->
</template>

<script>
import DashboardThumbnail from './components/DashboardThumbnail.vue'
import ConfigService from '../services/config.service'
import DataService from '../services/data.service'
import MeasureService from '../services/measure.service'

export default {
  data: function () {
    return {
      fileinput: ''
    }
  },
  computed: {
    measures() {
      return this.$store.state.measures.measures
    } 
  },
  methods: {
    initialize () {
      ConfigService.checkConfig().then(_ => 
        MeasureService.checkMeasures().then(_ => 
          DataService.checkAllFiles().then(_ =>  
            MeasureService.updateMeasures()
          )
        )
      )
    },
  },
  created () {
    this.initialize()
  },
  components: {
    'dashboard-thumbnail': DashboardThumbnail
  }
}
</script>

<style scoped>
  .mu-card {
    height: 97%;
    padding: 1.2em;
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .mu-card {
    background-color: #fff;
    position: relative;
    border-radius: 2px;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
  }

  div.thumbnails {
    justify-content: normal;
  }

  .dashboard-thumbnail-outer {
    margin: auto;
    max-width: 750px;
  }

  @media screen and (max-device-width: 768px) {
    .dashboard-thumbnail-outer {
      width: 100%;
    }
  }
  @media screen and (orientation: portrait) {
    .dashboard-thumbnail-outer {
      width: 100%;
    }
  }
</style>
