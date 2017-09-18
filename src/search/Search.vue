<template>
  <div class="search">
    <form novalidate v-on:submit.prevent>

      <div class="input-group">
        <input type="text" name="searchTerm" id="searchTerm" class="form-control input-sm"
          v-model.lazy.trim="searchTerm"
          v-validate="'min:3'" 
          :disabled="searchDisabled" :placeholder="searchDisabled ? 'Search not available' : 'Search for text'" >

        <span class="input-group-btn">
          <button class="btn btn-sm btn-outline-info" :disabled="errors.has('searchTerm') || searchDisabled" @click="showModal = true">
            Search
          </button>
        </span>
        <em v-show="errors.has('searchTerm')">{{ errors.first('searchTerm') }}</em>
      </div>
    </form>
    <search-modal v-if="showModal" @close="showModal = false"> </search-modal>
  </div>
</template>

<script>
import SearchModal from './SearchModal.vue'

export default {
  props: [
    'page'
  ],
  data() {
    return {
      showModal: false,
      searchTerm: '',
      searchablePages: ['validations', 'referentials', 'clinics']
    }
  },
  computed: {
    searchDisabled() {
      return !this.isSearchable
    },
    isSearchable() {
      return this.searchablePages.includes(this.page)
    }
  },
  components: {
    'search-modal': SearchModal,
  },
  methods: {
    search() {
      this.showModal = true
    }
  }
}
</script>

<style scoped>
div.input-group { 
  width: 250px;
}

div.search { 
  margin: auto;
  margin-right: 15px;   
}
</style>
