<template>
  <div></div>
</template>

<script>
export default {
  props: [
    'page',
    'content',
    'zoom'
  ],
  watch: {
    content: function() {
      this.setPageContent()
    }
  },
  methods: {
    setPageContent() {
      if (!this.$el || !this.content) {
        return;
      }
      const outerDiv = this.$el 
      outerDiv.setAttribute('id', 'dataContainer');
      outerDiv.innerHTML = this.content;
      outerDiv.style.zoom = this.zoom;
    },
  },
  mounted() {
    this.setPageContent()
  }
}
</script>

<style scoped>
</style>
