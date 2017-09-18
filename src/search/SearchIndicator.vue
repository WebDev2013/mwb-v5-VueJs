<template>
  <span>
    <span class="fa-stack fa-3x search-indicator">
      <i class="fa fa-circle fa-stack-2x"></i>
      <i class="fa fa-search fa-stack-1x" :class="{'fa-search-offset': !!count}" ></i>
      <span class="fa-stack-1x text">{{count}}</span>
    </span>
  </span>
</template>

<script>
export default {
  props: [
    'count',
  ],
}
</script>

<style scoped>
.search-indicator {
  font-size: 0.85em;
  /* margin: auto; */
}
.fa-circle {
  color: #F97924;
}
.fa-search {
  color: black;
}
.text {
  font-size: 0.5em;
  bottom:-5px;
}
.fa-search-offset {
  font-size: 0.5em;
  color: black;
  top:-6px;
}
</style>
