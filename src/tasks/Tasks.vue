<template>
  <div>
    <h1>Tasks</h1>
    <hr/>
    <kanban :stages="stages" :blocks="tasks">
      <task v-for="task in tasks" :key="task.id" :slot="task.id" :task="task"></task>
    </kanban>
  </div>
</template>

<script>
import Kanban from './Kanban.vue'
import Task from './Task.vue'

export default {
  data: function () {
    return {
      stages: ['Unassigned', 'Assigned', 'In Progress', 'Waiting', 'Finished', 'Expired'],
      tasks: [
        {
          id: 1,
          status: 'Unassigned',
          type: 'validations',
          effectiveDate: '2017-06-07',
        },
        {
          id: 2,
          status: 'Assigned',
          type: 'validations',
          icon: 'fa-check-square-o',
          effectiveDate: '2017-06-06',
          assignedTo: 'Sam'
        },
      ],
    }
  },
  components: {
    'kanban': Kanban,
    'task': Task
  }
}
</script>
