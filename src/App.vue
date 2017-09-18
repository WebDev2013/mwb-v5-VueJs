<template>
  <div id="app">
    <!-- <v-app> -->
      <div class="container-fluid">
        <mwb-navigation></mwb-navigation>
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    <!-- </v-app> -->
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import ConfigService from './services/config.service'
import DataService from './services/data.service'
import MeasureService from './services/measure.service'

export default {
  name: 'app',
  methods: {
  },
  created () {
  },
}
</script>

<style src="./app-animation.css"></style>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
  }
</style>
