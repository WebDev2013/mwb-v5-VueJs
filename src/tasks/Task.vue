<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ task.assignedTo }}</div>
  </div>
</template>

<script>
import { formatDate } from '@/common/date.filter'

export default {
  props: [
    'task'
  ],
  computed: {
    title() {
      return `${this.task.type} ${formatDate(this.task.effectiveDate, 'DD MMM')}`
    }
  }

}
</script>
